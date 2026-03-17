package com.company.electricfanshop.controller.product;

import com.company.electricfanshop.dto.product.request.ProductVariantCreateRequest;
import com.company.electricfanshop.dto.product.request.ProductVariantUpdateRequest;
import com.company.electricfanshop.dto.product.response.ProductVariantResponse;
import com.company.electricfanshop.service.product.ProductVariantService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products/{productId}/variants")
@AllArgsConstructor
public class ProductVariantController {
    private ProductVariantService productVariantService;

    @GetMapping()
    public ResponseEntity<List<ProductVariantResponse>> getByProductId(@PathVariable Integer productId) {
        List<ProductVariantResponse> list = productVariantService.getByProductId(productId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductVariantResponse> getById(@PathVariable Integer id) {
        ProductVariantResponse response = productVariantService.getById(id);
        if (response == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping
    public ResponseEntity<ProductVariantResponse> create(@RequestBody ProductVariantCreateRequest request) {
        ProductVariantResponse response = productVariantService.create(request);
        if (response == null) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductVariantResponse> update(@PathVariable Integer id, @RequestBody ProductVariantUpdateRequest request) {
        ProductVariantResponse response = productVariantService.update(id, request);
        return ResponseEntity.ok(response);
    }
}

