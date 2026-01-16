package com.company.electricfanshop.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.company.electricfanshop.dto.product.response.ProductResponse;
import com.company.electricfanshop.entity.Product;
import com.company.electricfanshop.mapper.ProductMapper;
import com.company.electricfanshop.service.ProductService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private ProductService productService;

    private ProductMapper productMapper;

    // Fetch All Products or Fetch Products by Category ID
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getProducts(@RequestParam(required = false) Integer categoryId) {
        List<Product> products;
        if (categoryId == null) {
            products = productService.findAll();
        } else {
            products = productService.findByCategoryId(categoryId);
        }

        List<ProductResponse> responses = products.stream()
                .map(product -> productMapper.toResponse(product))
                .toList();
        return ResponseEntity.ok(responses);
    }

    // Fetch Product by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Integer id) {
        Product product = productService.findById(id);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        ProductResponse response = productMapper.toResponse(product);
        return ResponseEntity.ok(response);
    }

    // Delete Product by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable Integer id) {
        productService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}