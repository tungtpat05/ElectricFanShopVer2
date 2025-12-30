/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import entity.CartItem;
import entity.Category;
import entity.User;
import jakarta.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import service.CartService;
import service.CategoryService;

/**
 * Created by Tungtpat05 on Oct 2, 2025.
 */
@Controller
public class CartController {

    @Autowired
    private CartService cartService;
    
    @Autowired
    private CategoryService categoryService;

    // Thêm sản phẩm vào giỏ (thêm CartItem)
    @PostMapping("/addToCart")
    public String addCartItem(@RequestParam("productId") int productId,
            HttpSession session,
            RedirectAttributes redirectAttributes) {

        User user = (User) session.getAttribute("user");
        if (user == null) {
            redirectAttributes.addFlashAttribute("errorCartLogin", "Xin vui lòng đăng nhập");
        } else {
            cartService.addCartItem(user, productId, 1);
            // Dùng RedirectAttributes để gửi được dữ liệu đi kèm khi redirect
            redirectAttributes.addFlashAttribute("successAddCart", "Thêm vào giỏ thành công");
        }

        return "redirect:/";
    }

    // List tất cả CartItem (Sản phẩm trong giỏ)
    @GetMapping("/cart")
    public String listCartItem(Model model, HttpSession session) {
        // Gửi tất cả các Category lên để hiện chỗ Drop-down Menu
        List<Category> categories = categoryService.listCategories();
        model.addAttribute("categories", categories);

        // Lấy User từ Session
        User user = (User) session.getAttribute("user");

        // Lấy ra số sản phẩm trong giỏ User đang đăng nhập từ session
        int numberCartItems;
        if (user == null) {
            numberCartItems = 0;
        } else {
            numberCartItems = cartService.countCartItems(user.getCart());
        }
        model.addAttribute("numberCartItems", numberCartItems);

        // List các Cart Item lên
        List<CartItem> cartItems = cartService.listCartItems(user.getCart());
        model.addAttribute("cartItems", cartItems);

        // Gọi hàm tính tiền 
        BigDecimal total = cartService.totalPrice(user.getCart());
        model.addAttribute("total", total);

        return "cart";
    }

    // Xoá sản phẩm ở giỏ (xoá CartItem)
    @PostMapping("/cart/remove")
    public String deleteCartItem(@RequestParam("cartItemId") int cartItemId) {
        cartService.deleteCartItem(cartItemId);
        return "redirect:/cart";
    }

    // Tăng giảm số lượng
    @PostMapping("/cart/update")
    public String updateQuantity(
            @RequestParam("cartItemId") int cartItemId,
            @RequestParam("action") String action
    ) {

        cartService.updateQuantity(cartItemId, action);
        return "redirect:/cart";
    }

}
