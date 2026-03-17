package com.company.electricfanshop.controller.product;

import com.company.electricfanshop.dto.product.request.ProductCreateRequest;
import com.company.electricfanshop.dto.product.request.ProductUpdateRequest;
import com.company.electricfanshop.dto.product.response.ProductResponse;
import com.company.electricfanshop.service.product.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductController {
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAll(@RequestParam(required = false) Integer categoryId) {
        List<ProductResponse> list;
        if (categoryId == null) {
            list = productService.getAll();
        } else {
            list = productService.getByCategoryId(categoryId);
        }
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getByProductId(@PathVariable Integer id) {
        ProductResponse response = productService.getById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@RequestBody ProductCreateRequest request) {
        ProductResponse response = productService.create(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Integer id, @RequestBody ProductUpdateRequest request) {
        ProductResponse response = productService.update(id, request);
        return ResponseEntity.ok(response);
    }
}
