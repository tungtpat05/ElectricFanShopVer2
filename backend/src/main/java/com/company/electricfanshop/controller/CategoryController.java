package com.company.electricfanshop.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.electricfanshop.dto.category.response.CategoryResponse;
import com.company.electricfanshop.entity.Category;
import com.company.electricfanshop.mapper.CategoryMapper;
import com.company.electricfanshop.service.CategoryService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {

    private CategoryService categoryService;

    private CategoryMapper categoryMapper;

    // Fetch All Categories
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        List<Category> categories = categoryService.findAll();

        List<CategoryResponse> responses = categories.stream()
                .map(category -> categoryMapper.toResponse(category))
                .toList();

        return ResponseEntity.ok(responses);
    }

    // Fetch Category by ID
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Integer id) {
        Category category = categoryService.findById(id);
        if (category == null) {
            return ResponseEntity.notFound().build();
        }
        CategoryResponse response = categoryMapper.toResponse(category);
        return ResponseEntity.ok(response);
    }
    
    // Delete Category by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCategoryById(@PathVariable Integer id) {
        categoryService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
