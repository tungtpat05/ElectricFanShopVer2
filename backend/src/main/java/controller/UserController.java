/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import entity.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import service.CartService;
import service.UserService;

/**
 * Created by Tungtpat05 on Sep 28, 2025.
 */
@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CartService cartService;

    // Go to Login Page
    @GetMapping("/loginForm")
    public String goLoginForm() {
        return "login";
    }

    // Profile
    @GetMapping("/user/profile")
    public String profile(Model model, HttpSession session) {
        // Lấy ra User từ session
        User user = (User)session.getAttribute("user");
        model.addAttribute("user", user);
        
        return "user/profile";
    }
    
    // Save user khi update
    @PostMapping("user/save")
    public String save(@ModelAttribute User userForm, HttpSession session) {
        // Lấy ra User hiện tại đang đăng nhập
        User currentUser = (User)session.getAttribute("user");
        
        // Set lại info mới nếu thay đổi
        currentUser.setFullName(userForm.getFullName());
        currentUser.setPassword(userForm.getPassword());
        
        // Lưu lại Info của current User xuống DB
        userService.save(currentUser);
        
        return "redirect:/user/profile";
    }

    //Go to dashboard for ADMIN
    @GetMapping("/admin/dashboard")
    public String goDashboard() {
        return "admin/dashboard";
    }

    // Login
    @PostMapping("/login")
    public String login(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            HttpSession session,
            Model model) {

        if (username.equals("admin") && userService.login(username, password)) {
            session.setAttribute("user", userService.findByUsername(username)); // lưu User vào session
            return "redirect:/admin/dashboard"; //Quay về trang admin dashboard
        } else if (userService.login(username, password)) {
            session.setAttribute("user", userService.findByUsername(username)); // lưu User vào session
            return "redirect:/"; //Quay về trang chủ
        } else {
            model.addAttribute("error", "Sai tài khoản hoặc mật khẩu");
            return "login";
        }
    }

    // Logout
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate(); // xoá session
        return "redirect:/";
    }

    // Signup Form
    @GetMapping("/signupForm")
    public String signupForm(Model model) {
        User user = new User();
        model.addAttribute("user", user);

        return "signup";
    }

    // Check username và email chưa tồn tại thì Save
    @PostMapping("/signupForm/save")
    public String save(@ModelAttribute("user") User user, Model model) {

        // Check Email tồn tại chưa
        User userFoundedByEmail = userService.findByEmail(user.getEmail());
        if (userFoundedByEmail != null) {
            model.addAttribute("errorEmail", "Email đã tồn tại!");
            //Tồn tại rồi thì load lại trang signup
            return "signup";
        }

        //Check username đã tồn tại chưa
        User userFoundedByUsername = userService.findByUsername(user.getUsername());
        if (userFoundedByUsername != null) {
            model.addAttribute("errorUsername", "Tên đăng nhập đã tồn tại!");
            //Tồn tại rồi thì load lại trang signup
            return "signup";
        }

        user.setRole("USER");
        userService.save(user);

        // Tạo 1 Cart mặc định duy nhất cho mỗi User
        cartService.createCartForUser(user);

        return "redirect:/loginForm";
    }
    
}
