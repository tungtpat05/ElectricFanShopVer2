/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import entity.Category;
import entity.Product;
import entity.User;
import jakarta.servlet.http.HttpSession;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import service.CartService;
import service.CategoryService;
import service.MailService;
import service.ProductService;

/**
 * Created by Tungtpat05 on Sep 16, 2025.
 */
@Controller
public class HomeController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CartService cartService;
    
    @Autowired
    private MailService mailService;

    // "/home" này chỉ là 1 phần đường dẫn trên URL
    @GetMapping({"/home", "/"})
    public String home(Model model, HttpSession session) {
        List<Product> products = productService.listProducts();
        List<Category> categories = categoryService.listCategories();

        // Lấy ra số sản phẩm trong giỏ User đang đăng nhập từ session
        User user = (User) session.getAttribute("user");
        int numberCartItems;
        if (user == null) {
            numberCartItems = 0;
        } else {
            numberCartItems = cartService.countCartItems(user.getCart());
        }

        //model là Object trung gian Spring cung cấp
        model.addAttribute("products", products);
        model.addAttribute("categories", categories);
        model.addAttribute("numberCartItems", numberCartItems);

        //"home" này để ghép ra home.jsp
        return "home";
    }

    // Show sản phẩm theo phân loại
    @GetMapping({"/category/product-list"})
    public String listProductByCategory(Model model, @RequestParam("id") int categoryId, HttpSession session) {

        // Gửi tất cả các Category lên để hiện chỗ Drop-down Menu
        List<Category> categories = categoryService.listCategories();
        model.addAttribute("categories", categories);

        // Gửi List sản phẩm tương ứng lên
        Category category = categoryService.findCategoryById(categoryId);
        List<Product> products = productService.findProductByCategory(category);
        model.addAttribute("products", products);

        // Lấy ra số sản phẩm trong giỏ User đang đăng nhập từ session
        User user = (User) session.getAttribute("user");
        int numberCartItems;
        if (user == null) {
            numberCartItems = 0;
        } else {
            numberCartItems = cartService.countCartItems(user.getCart());
        }
        model.addAttribute("numberCartItems", numberCartItems);

        return "category-product-list";
    }

    // Hiện cái page Support
    @GetMapping("/supportForm")
    public String showSupportForm(Model model, HttpSession session) {
        // Gửi tất cả các Category lên để hiện chỗ Drop-down Menu
        List<Category> categories = categoryService.listCategories();
        model.addAttribute("categories", categories);

        // Lấy ra số sản phẩm trong giỏ User đang đăng nhập từ session
        User user = (User) session.getAttribute("user");
        int numberCartItems;
        if (user == null) {
            numberCartItems = 0;
        } else {
            numberCartItems = cartService.countCartItems(user.getCart());
        }
        model.addAttribute("numberCartItems", numberCartItems);

        return "support";
    }
    
    // Dành cho nút gửi Support
    @PostMapping("/support")
    public String handleSupport(
            @RequestParam("name") String name,
            @RequestParam("phone") String phone,
            @RequestParam("email") String email,
            @RequestParam("topic") String topic,
            @RequestParam("message") String message
    ) {

        // Gửi email đến admin
        mailService.sendSupportMail(name, phone, email, topic, message);

        // Gửi email xác nhận cho người dùng
        mailService.sendConfirmationMail(email, name);

        return "redirect:/supportForm";
    }

    // Product Details
    @GetMapping("/product/details")
    public String productDetails(@RequestParam("productId") int productId, Model model, HttpSession session) {
        // Gửi tất cả các Category lên để hiện chỗ Drop-down Menu
        List<Category> categories = categoryService.listCategories();
        model.addAttribute("categories", categories);

        // Chi tiết sản phẩm
        Product product = productService.findProductById(productId);
        model.addAttribute("p", product);
        
        // Lấy ra số sản phẩm trong giỏ User đang đăng nhập từ session
        User user = (User) session.getAttribute("user");
        int numberCartItems;
        if (user == null) {
            numberCartItems = 0;
        } else {
            numberCartItems = cartService.countCartItems(user.getCart());
        }
        model.addAttribute("numberCartItems", numberCartItems);

        return "product-details";
    }

}
