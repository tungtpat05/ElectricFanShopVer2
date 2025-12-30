/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package service;

import entity.Order;
import entity.User;
import java.math.BigDecimal;
import java.util.List;

/**
 *Created by Tungtpat05 on Sep 25, 2025.
 */
public interface OrderService {
    // Tạo Order Tạm (Chưa thành order thật) khi ấn vào nút Thanh Toán (Proceed to checkout)  
    Order createTempOrder(User user);
    
    // Update Info cho Order thật, thêm thông tin cho các field vừa nhập
    void placeOrder(User user, int orderId, BigDecimal totalAmount, String shippingAddress, String shippingPhone);
    
    // List Order
    List<Order> listAllOrder(User user);
    
    // List tất những đơn hàng (và sản phẩm trong đơn hàng) đã đặt với ADMIN
    List<Order> listAllOrderWithAdmin();

}
