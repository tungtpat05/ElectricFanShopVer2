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

import com.company.electricfanshop.entity.Cart;
import com.company.electricfanshop.entity.CartItem;
import com.company.electricfanshop.entity.Product;
import com.company.electricfanshop.entity.User;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.repository.CartItemRepository;
import com.company.electricfanshop.repository.CartRepository;
import com.company.electricfanshop.repository.ProductRepository;


/**
 * Created by Tungtpat05 on Oct 1, 2025.
 */
@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    // Tạo Cart mới cho User ngay sau khi Regis thành công
    public void createCartForUser(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        cartRepository.save(cart);
    }

    // Đếm số lượng CartItem
    public int countCartItems(Cart cart) {
        List<CartItem> cartItems = cartItemRepository.findByCart(cart);

        int numberCartItems = cartItems.size();

        return numberCartItems;
    }

    // Thêm sản phẩm vào giỏ (thêm CartItem)
    @Override
    public void addCartItem(User user, int productId, int quantity) {
        Cart cart = cartRepository.findByUser(user);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(productId));

        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product);

        // Nếu chưa tồn tại
        if (cartItem == null) {
            // Tạo mới
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);

        } else {
            // Tồn tại sp này trong giỏ rồi --> cộng thêm quantity
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        }

        // Lưu CartItem
        cartItemRepository.save(cartItem);

        // Thêm CartItem và Cart và Lưu
        // NOTE: Đoạn này nếu thêm vào sẽ bị lỗi do LAZY LOAD gì đấy
//        cart.getCartItems().add(cartItem);
//        cartRepository.save(cart);
    }

    // List tất cả CartItem (Sản phẩm trong giỏ)
    public List<CartItem> listCartItems(Cart cart) {
        return cartItemRepository.findByCart(cart);

    }

    // Xoá sản phẩm ở giỏ (xoá CartItem)
    @Override
    public void deleteCartItem(int cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException(cartItemId));

        // Xoá đi
        cartItemRepository.delete(cartItem);
    }

    // Tăng giảm quantity
    @Override
    public void updateQuantity(int cartItemId, String action) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException(cartItemId));
        if (action.equals("increase")) {
            cartItem.setQuantity(cartItem.getQuantity() + 1);
        } else {
            // Nếu số lượng <= 1 thì không làm gì do có Constrain trong DB rồi
            if (cartItem.getQuantity() <= 1) {
                return;
            }

            cartItem.setQuantity(cartItem.getQuantity() - 1);

        }
        cartItemRepository.save(cartItem);
    }

    // Tính tổng tiền
    @Override
    public BigDecimal totalPrice(Cart cart) {
        BigDecimal total = BigDecimal.ZERO;
        List<CartItem> cartItems = listCartItems(cart);

        for (CartItem cartItem : cartItems) {
            int quantity = cartItem.getQuantity();
            BigDecimal unitPrice = cartItem.getProduct().getPrice();

            // unitPrice * quantity
            BigDecimal itemTotal = unitPrice.multiply(BigDecimal.valueOf(quantity));

            // cộng dồn
            total = total.add(itemTotal);
        }

        return total;
    }

    @Override
    @Transactional
    public void clearCart(int cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException(cartId));

        // Xoá tất cả CartItem liên quan đến Cart này
        cartItemRepository.deleteAll(cart.getCartItems());

        // Làm rỗng list trong entity
        cart.getCartItems().clear();

        // Lưu lại cart rỗng
        cartRepository.save(cart);
    }

}
