package com.company.electricfanshop.controller.product;

import com.company.electricfanshop.dto.product.request.*;
import com.company.electricfanshop.dto.product.response.ProductImageResponse;
import com.company.electricfanshop.dto.product.response.ProductResponse;
import com.company.electricfanshop.dto.product.response.ProductVariantResponse;
import com.company.electricfanshop.service.product.ProductImageService;
import com.company.electricfanshop.service.product.ProductService;
import com.company.electricfanshop.service.product.ProductVariantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final ProductImageService productImageService;
    private final ProductVariantService productVariantService;

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAll(@RequestParam(required = false) Integer categoryId) {
        List<ProductResponse> list = (categoryId == null)
                ? productService.getAll()
                : productService.getByCategoryId(categoryId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getById(@PathVariable Integer id) {
        ProductResponse response = productService.getById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ProductResponse> create(@RequestBody ProductCreateRequest request) {
        ProductResponse response = productService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update(@PathVariable Integer id, @RequestBody ProductUpdateRequest request) {
        ProductResponse response = productService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{productId}/images")
    public ResponseEntity<List<ProductImageResponse>> getImages(@PathVariable Integer productId) {
        List<ProductImageResponse> list = productImageService.getAll(productId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{productId}/images/{imageId}")
    public ResponseEntity<ProductImageResponse> getImageById(@PathVariable Integer productId, @PathVariable Integer imageId) {
        ProductImageResponse response = productImageService.getById(productId, imageId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{productId}/images")
    public ResponseEntity<ProductImageResponse> createImage(
            @PathVariable Integer productId,
            @RequestBody ProductImageCreateRequest request) {
        ProductImageResponse response = productImageService.create(productId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{productId}/images/{imageId}")
    public ResponseEntity<ProductImageResponse> updateImage(
            @PathVariable Integer productId,
            @PathVariable Integer imageId,
            @RequestBody ProductImageUpdateRequest request) {
        ProductImageResponse response = productImageService.update(productId, imageId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{productId}/variants")
    public ResponseEntity<List<ProductVariantResponse>> getVariants(@PathVariable Integer productId) {
        List<ProductVariantResponse> list = productVariantService.getAll(productId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{productId}/variants/{variantId}")
    public ResponseEntity<ProductVariantResponse> getVariants(@PathVariable Integer productId, @PathVariable Integer variantId) {
        ProductVariantResponse response = productVariantService.getById(productId, variantId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{productId}/variants")
    public ResponseEntity<ProductVariantResponse> createVariant(
            @PathVariable Integer productId,
            @RequestBody ProductVariantCreateRequest request) {
        ProductVariantResponse response = productVariantService.create(productId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{productId}/variants/{variantId}")
    public ResponseEntity<ProductVariantResponse> update(
            @PathVariable Integer productId,
            @PathVariable Integer variantId,
            @RequestBody ProductVariantUpdateRequest request) {
        ProductVariantResponse response = productVariantService.update(productId, variantId, request);
        return ResponseEntity.ok(response);
    }
}
