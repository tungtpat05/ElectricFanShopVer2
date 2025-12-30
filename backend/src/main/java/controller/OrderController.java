/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import entity.Category;
import entity.Order;
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
import service.OrderService;

/**
 * Created by Tungtpat05 on Oct 3, 2025.
 */
@Controller
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private CartService cartService;
    
    @Autowired
    private CategoryService categoryService;

    // Load trang Chekout (Thanh Toán)
    @GetMapping("/cart/checkout")
    public String checkout(Model model, HttpSession session) {
        // Lấy user từ session
        User user = (User) session.getAttribute("user");
        
        // Lấy ra số sản phẩm trong giỏ User đang đăng nhập từ session
        int numberCartItems;
        if (user == null) {
            numberCartItems = 0;
        } else {
            numberCartItems = cartService.countCartItems(user.getCart());
        }
        model.addAttribute("numberCartItems", numberCartItems);
        
        // Gửi tất cả các Category lên để hiện chỗ Drop-down Menu
        List<Category> categories = categoryService.listCategories();
        model.addAttribute("categories", categories);

        // Lấy total tiền hàng của user
        BigDecimal total = cartService.totalPrice(user.getCart());
        model.addAttribute("total", total);

        // Tạo 1 Order Temp để lấy Mã Đơn Hàng
        Order order = orderService.createTempOrder(user);
        model.addAttribute("orderId", order.getId());

        // Lấy username để tạo Nội dung chuyển khoản
        model.addAttribute("username", user.getUsername());

        // Lấy fullName
        model.addAttribute("fullName", user.getFullName());

        return "checkout";

    }

    // Đặt hàng (Order) sau khi cọc --> Quay về Trang chủ
    @PostMapping("/cart/order")
    public String order(
            @RequestParam("orderId") int orderId,
            @RequestParam("total") BigDecimal total,
            @RequestParam("shippingAddress") String shippingAddress,
            @RequestParam("shippingPhone") String shippingPhone,
            HttpSession session,
            RedirectAttributes redirectAttributes
    ) {
        User user = (User) session.getAttribute("user");

        orderService.placeOrder(user, orderId, total, shippingAddress, shippingPhone);

        redirectAttributes.addFlashAttribute("successOrder", "Đặt hàng thành công!");

        return "redirect:/"; 
        
    }

    // Thông báo Order thành công
    @GetMapping("/cart/order-success")
    public String orderSuccessPage() {
        return "order-success";
    }

    // List những đơn hàng (và sản phẩm trong đơn hàng) đã đặt theo User
    @GetMapping("/user/ordered")
    public String listAllOrder(HttpSession session, Model model) {
        // Lấy User từ Session
        User user = (User) session.getAttribute("user");

        List<Order> orders = orderService.listAllOrder(user);
        model.addAttribute("orders", orders);

        return "user/ordered";
    }

    // List tất những đơn hàng (và sản phẩm trong đơn hàng) đã đặt với ADMIN
    @GetMapping("/admin/ordered")
    public String listAllOrderWithAdmin(Model model) {

        // Vào được dashboard của ADMIN rồi mới Ấn được chức năng này --> Không cần check ADMIN lại
        List<Order> orders = orderService.listAllOrderWithAdmin();
        model.addAttribute("orders", orders);

        return "admin/ordered";
    }
}
