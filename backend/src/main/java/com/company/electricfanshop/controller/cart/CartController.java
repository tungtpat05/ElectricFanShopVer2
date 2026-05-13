/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.company.electricfanshop.controller.cart;

import com.company.electricfanshop.dto.cart.request.AddToCartRequest;
import com.company.electricfanshop.dto.cart.request.AdjustCartItemQuantityRequest;
import com.company.electricfanshop.dto.cart.response.CartSummaryResponse;
import com.company.electricfanshop.service.cart.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/**
 * Created by Tungtpat05 on Oct 2, 2025.
 */
@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartSummaryResponse> getCart(Principal principal) {
        CartSummaryResponse response = cartService.getCartSummary(principal);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/items")
    public ResponseEntity<CartSummaryResponse> addToCart(
            Principal principal,
            @Valid @RequestBody AddToCartRequest request) {
        CartSummaryResponse response = cartService.addToCart(principal, request);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/items/increase")
    public ResponseEntity<CartSummaryResponse> increaseQuantity(
            Principal principal,
            @Valid @RequestBody AdjustCartItemQuantityRequest request) {
        CartSummaryResponse response = cartService.increaseQuantity(principal, request);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/items/decrease")
    public ResponseEntity<CartSummaryResponse> decreaseQuantity(
            Principal principal,
            @Valid @RequestBody AdjustCartItemQuantityRequest request) {
        CartSummaryResponse response = cartService.decreaseQuantity(principal, request);
        return ResponseEntity.ok(response);
    }
}
