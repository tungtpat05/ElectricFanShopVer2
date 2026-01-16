/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.company.electricfanshop.service;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.company.electricfanshop.entity.CartItem;
import com.company.electricfanshop.entity.Order;
import com.company.electricfanshop.entity.OrderItem;
import com.company.electricfanshop.entity.User;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.repository.OrderItemRepository;
import com.company.electricfanshop.repository.OrderRepository;

/**
 * Created by Tungtpat05 on Oct 3, 2025.
 */
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartService cartService;

    // Tạo Order Tạm (Chưa thành order thật) khi ấn vào nút Thanh Toán (Proceed to checkout) 
    @Override
    public Order createTempOrder(User user) {
        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress("Address temp");
        order.setShippingPhone("Phone temp");
        order.setStatus("WAITING_DEPOSIT");
        order.setTotalAmount(BigDecimal.ZERO);

        orderRepository.save(order);

        return order;
    }

    // Update Info cho Order thật. thêm thông tin cho các field vừa nhập
    @Override
    @Transactional
    public void placeOrder(User user, int orderId, BigDecimal totalAmount, String shippingAddress, String shippingPhone) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException(orderId));

        order.setUser(user);
        order.setTotalAmount(totalAmount);
        order.setShippingAddress(shippingAddress);
        order.setShippingPhone(shippingPhone);
        order.setStatus("DEPOSIT_PAID");

        // Lưu OrderItems (Dựa vào productId để từ CartItem-->OrderItem)
        List<CartItem> cartItems = cartService.listCartItems(user.getCart());
        // Duyệt qua lần lượt CartItem có trong Cart để tạo OrderItem
        for (CartItem cartItem : cartItems) {
            // Tạo OrderItem tương ứng
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(cartItem.getProduct().getPrice());

            // Lưu OrderItem vừa tạo xuống DB
            orderItemRepository.save(orderItem);

            // Add orderItem vào field List<OrderItem> của Order
            order.getOrderItems().add(orderItem);
        }
        // Lưu lại Order
        orderRepository.save(order);

        // Clear Cart
        cartService.clearCart(user.getCart().getId());
    }

    @Override
    public List<Order> listAllOrder(User user) {
        return orderRepository.findByUserAndStatus(user, "DEPOSIT_PAID");
    }

    // List tất những đơn hàng (và sản phẩm trong đơn hàng) đã đặt với ADMIN
    @Override
    public List<Order> listAllOrderWithAdmin() {
        return orderRepository.findByStatus("DEPOSIT_PAID");
    }

}
