package com.company.electricfanshop.controller.product;

import com.company.electricfanshop.dto.product.request.ProductImageCreateRequest;
import com.company.electricfanshop.dto.product.request.ProductImageUpdateRequest;
import com.company.electricfanshop.dto.product.response.ProductImageResponse;
import com.company.electricfanshop.service.product.ProductImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products/{productId}/images")
@AllArgsConstructor
public class ProductImageController {
    private ProductImageService productImageService;

    @GetMapping
    public ResponseEntity<List<ProductImageResponse>> getByProductId(@PathVariable Integer productId) {
        List<ProductImageResponse> list = productImageService.getByProductId(productId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductImageResponse> getById(@PathVariable Integer id) {
        ProductImageResponse response = productImageService.getById(id);
        if (response == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping
    public ResponseEntity<ProductImageResponse> create(@RequestBody ProductImageCreateRequest request) {
        ProductImageResponse response = productImageService.create(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductImageResponse> update(@PathVariable Integer id, @RequestBody ProductImageUpdateRequest request) {
        ProductImageResponse response = productImageService.update(id, request);
        return ResponseEntity.ok(response);
    }
}

