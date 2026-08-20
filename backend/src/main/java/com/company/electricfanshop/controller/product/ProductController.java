package com.company.electricfanshop.controller.product;

import com.company.electricfanshop.dto.product.request.*;
import com.company.electricfanshop.dto.product.response.ProductImageResponse;
import com.company.electricfanshop.dto.product.response.ProductResponse;
import com.company.electricfanshop.dto.product.response.ProductVariantResponse;
import com.company.electricfanshop.dto.product.response.ProductSpecificationResponse;
import com.company.electricfanshop.service.product.ProductImageService;
import com.company.electricfanshop.service.product.ProductService;
import com.company.electricfanshop.service.product.ProductVariantService;
import com.company.electricfanshop.service.product.ProductSpecificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final ProductImageService productImageService;
    private final ProductVariantService productVariantService;
    private final ProductSpecificationService productSpecificationService;

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

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ProductResponse> create(@RequestBody ProductCreateRequest request) {
        ProductResponse response = productService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
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

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{productId}/images")
    public ResponseEntity<ProductImageResponse> createImage(
            @PathVariable Integer productId,
            @RequestBody ProductImageCreateRequest request) {
        ProductImageResponse response = productImageService.create(productId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{productId}/images/{imageId}")
    public ResponseEntity<ProductImageResponse> updateImage(
            @PathVariable Integer productId,
            @PathVariable Integer imageId,
            @RequestBody ProductImageUpdateRequest request) {
        ProductImageResponse response = productImageService.update(productId, imageId, request);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{productId}/images/{imageId}")
    public ResponseEntity<Void> deleteImage(
            @PathVariable Integer productId,
            @PathVariable Integer imageId) {
        productImageService.delete(productId, imageId);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{productId}/images/reorder")
    public ResponseEntity<List<ProductImageResponse>> reorderImages(
            @PathVariable Integer productId,
            @RequestBody List<Integer> imageIdsOrdered) {
        List<ProductImageResponse> response = productImageService.updateDisplayOrders(productId, imageIdsOrdered);
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

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{productId}/variants")
    public ResponseEntity<ProductVariantResponse> createVariant(
            @PathVariable Integer productId,
            @RequestBody ProductVariantCreateRequest request) {
        ProductVariantResponse response = productVariantService.create(productId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{productId}/variants/{variantId}")
    public ResponseEntity<ProductVariantResponse> updateVariant(
            @PathVariable Integer productId,
            @PathVariable Integer variantId,
            @RequestBody ProductVariantUpdateRequest request) {
        ProductVariantResponse response = productVariantService.update(productId, variantId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{productId}/specifications")
    public ResponseEntity<List<ProductSpecificationResponse>> getSpecifications(@PathVariable Integer productId) {
        List<ProductSpecificationResponse> list = productSpecificationService.getAll(productId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{productId}/specifications/{specificationId}")
    public ResponseEntity<ProductSpecificationResponse> getSpecificationById(
            @PathVariable Integer productId,
            @PathVariable Integer specificationId) {
        ProductSpecificationResponse response = productSpecificationService.getById(productId, specificationId);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{productId}/specifications")
    public ResponseEntity<ProductSpecificationResponse> createSpecification(
            @PathVariable Integer productId,
            @RequestBody ProductSpecificationCreateRequest request) {
        ProductSpecificationResponse response = productSpecificationService.create(productId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{productId}/specifications/{specificationId}")
    public ResponseEntity<ProductSpecificationResponse> updateSpecification(
            @PathVariable Integer productId,
            @PathVariable Integer specificationId,
            @RequestBody ProductSpecificationUpdateRequest request) {
        ProductSpecificationResponse response = productSpecificationService.update(productId, specificationId, request);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{productId}/specifications/{specificationId}")
    public ResponseEntity<Void> deleteSpecification(
            @PathVariable Integer productId,
            @PathVariable Integer specificationId) {
        productSpecificationService.delete(productId, specificationId);
        return ResponseEntity.noContent().build();
    }
}
