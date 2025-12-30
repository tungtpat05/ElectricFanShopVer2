/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package controller;

import entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import service.CategoryService;

/**
 *Created by Tungtpat05 on Sep 28, 2025.
 */
@Controller
@RequestMapping("/admin/category")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    //List All
    @GetMapping("/list")
    public String listCategories(Model model) {
        model.addAttribute("categories", categoryService.listCategories());
        return "admin/category-list";
    }
 
    //Show Form for Add
    @GetMapping("/addForm")
    public String showFormForAdd(Model model) {
        Category category = new Category();
        model.addAttribute("category", category);
        
        return "admin/category-form";
    }
    
    //Show Form for Update
    @GetMapping("/updateForm")
    public String showFormForUpdate(@RequestParam("id") int id, Model model) {
        Category category = categoryService.findCategoryById(id);
        model.addAttribute("category", category);
        
        return "admin/category-form";
    }

    //Delete Category
    @PostMapping("/delete")
    public String deleteCategry(@RequestParam("id") int id) {
        categoryService.deleteCategory(id);
        return "redirect:/admin/category/list";
    }

    //Save Category
    @PostMapping("/save")
    public String saveCategory(@ModelAttribute("category") Category category) {
        categoryService.saveCategory(category);
        return "redirect:/admin/category/list";
    }
}
