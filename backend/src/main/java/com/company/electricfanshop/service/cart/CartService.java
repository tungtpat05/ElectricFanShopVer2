package com.company.electricfanshop.service.cart;

import com.company.electricfanshop.dto.cart.request.AddToCartRequest;
import com.company.electricfanshop.dto.cart.response.CartSummaryResponse;
import com.company.electricfanshop.entity.cart.Cart;
import com.company.electricfanshop.entity.cart.CartItem;
import com.company.electricfanshop.entity.product.ProductVariant;
import com.company.electricfanshop.entity.user.User;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.mapper.cart.CartMapper;
import com.company.electricfanshop.repository.cart.CartItemRepository;
import com.company.electricfanshop.repository.cart.CartRepository;
import com.company.electricfanshop.repository.product.ProductRepository;
import com.company.electricfanshop.repository.product.ProductVariantRepository;
import com.company.electricfanshop.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final UserService userService;
    private final CartMapper cartMapper;

    public CartSummaryResponse getCartSummary(Principal principal) {
        User user = userService.getByEmail(principal.getName());
        Optional<Cart> cartOptional = cartRepository.findByUserId(user.getId());
        if (cartOptional.isEmpty()) {
            return cartMapper.toEmptySummary(user);
        }
        Cart cart = cartOptional.get();
        List<CartItem> items = cartItemRepository.findByCartId(cart.getId());
        return cartMapper.toSummary(cart, items);
    }

    @Transactional
    public CartSummaryResponse addToCart(Principal principal, AddToCartRequest request) {
        User user = userService.getByEmail(principal.getName());
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> createCart(user));

        ProductVariant variant = productVariantRepository.findById(request.getVariantId())
                .orElseThrow(() -> new ResourceNotFoundException(request.getVariantId()));
        if (!Boolean.TRUE.equals(variant.getIsActive())) {
            throw new IllegalArgumentException("Variant is inactive");
        }

        CartItem item = cartItemRepository.findByCartIdAndVariantId(cart.getId(), variant.getId()).orElse(null);
        int newQuantity = request.getQuantity();

        // Product Variant existed in user cart
        if (item != null) {
            newQuantity = item.getQuantity() + request.getQuantity();
        }

        int stockQuantity = variant.getStockQuantity() == null ? 0 : variant.getStockQuantity();
        if (newQuantity > stockQuantity) {
            throw new IllegalArgumentException("Insufficient stock for variant: " + variant.getId());
        }

        // Product Variant not existed in user cart
        if (item == null) {
            item = new CartItem();
            item.setCart(cart);
            item.setVariant(variant);
            item.setQuantity(newQuantity);
            cartItemRepository.save(item);
            if (cart.getCartItems() == null) {
                cart.setCartItems(new ArrayList<>());
            }
            cart.getCartItems().add(item);
        } else {
            item.setQuantity(newQuantity);
            cartItemRepository.save(item);
        }

        List<CartItem> items = cartItemRepository.findByCartId(cart.getId());
        return cartMapper.toSummary(cart, items);
    }

    private Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setCartItems(new ArrayList<>());
        return cartRepository.save(cart);
    }
}
