/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.company.electricfanshop.service;

import java.math.BigDecimal;
import java.util.List;

import com.company.electricfanshop.entity.Cart;
import com.company.electricfanshop.entity.CartItem;
import com.company.electricfanshop.entity.User;

/**
 * Created by Tungtpat05 on Sep 25, 2025.
 */
public interface CartService {

    // Tạo Cart mới cho User ngay sau khi Regis thành công
    void createCartForUser(User user);

    // Đếm số lượng CartItem
    int countCartItems(Cart cart);

    // List tất cả CartItem (Sản phẩm trong giỏ)
    List<CartItem> listCartItems(Cart cart);

    // Thêm sản phẩm vào giỏ (thêm CartItem)
    void addCartItem(User user, int productId, int quantity);

    // Xoá sản phẩm ở giỏ (xoá CartItem)
    void deleteCartItem(int cartItemId);

    // Tăng Giảm quantity
    void updateQuantity(int cartItemId, String action);

    // Tính tổng tiền
    BigDecimal totalPrice(Cart cart);
    
    // Clear Cart cho đơn hàng tiếp theo (Clear sp trong giỏ sau khi Đặt Hàng)
    void clearCart(int cartId);
}
