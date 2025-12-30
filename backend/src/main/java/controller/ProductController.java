/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import entity.Category;
import entity.Product;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import service.CategoryService;
import service.ProductService;

/**
 * Created by Tungtpat05 on Sep 25, 2025.
 */
@Controller
public class ProductController {

    @Autowired
    private ProductService productService;
    
    @Autowired
    private CategoryService categoryService;

    //List All
    @GetMapping("/admin/product/list")
    public String listProducts(Model model) {
        model.addAttribute("products", productService.listProducts());
        return "admin/product-list";
    }
 
    //Show Form for Add
    @GetMapping("/admin/product/addForm")
    public String showFormForAdd(Model model) {
        Product product = new Product();
        model.addAttribute("product", product);
        
        List<Category> categories = categoryService.listCategories();
        model.addAttribute("categories", categories);
        
        return "admin/product-form";
    }
    
    //Show Form for Update
    @GetMapping("/admin/product/updateForm")
    public String showFormForUpdate(@RequestParam("id") int id, Model model) {
        Product product = productService.findProductById(id);
        model.addAttribute("product", product);
        
        List<Category> categories = categoryService.listCategories();
        model.addAttribute("categories", categories);
        
        return "admin/product-form";
    }

    //Delete Product
    @PostMapping("/admin/product/delete")
    public String deleteProduct(@RequestParam("id") int id) {
        productService.deleteProduct(id);
        return "redirect:/admin/product/list";
    }

    //Save Product
    @PostMapping("/admin/product/save")
    public String saveProduct(@ModelAttribute("product") Product product) {
        productService.saveProduct(product);
        return "redirect:/admin/product/list";
    }
}
