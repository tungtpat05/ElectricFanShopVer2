package com.company.electricfanshop.mapper.cart;

import com.company.electricfanshop.dto.cart.response.CartItemResponse;
import com.company.electricfanshop.dto.cart.response.CartSummaryResponse;
import com.company.electricfanshop.dto.product.response.ColorResponse;
import com.company.electricfanshop.entity.cart.Cart;
import com.company.electricfanshop.entity.cart.CartItem;
import com.company.electricfanshop.entity.product.Product;
import com.company.electricfanshop.entity.product.ProductVariant;
import com.company.electricfanshop.entity.user.User;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class CartMapper {
    public CartSummaryResponse toSummary(Cart cart, List<CartItem> items) {
        List<CartItemResponse> itemResponses = new ArrayList<>();
        int totalQuantity = 0;
        BigDecimal totalPrice = BigDecimal.ZERO;

        for (CartItem item : items) {
            CartItemResponse itemResponse = toItemResponse(item);
            itemResponses.add(itemResponse);
            totalQuantity += itemResponse.getQuantity();
            totalPrice = totalPrice.add(itemResponse.getLineTotal());
        }

        CartSummaryResponse response = new CartSummaryResponse();
        response.setCartId(cart.getId());
        response.setUserId(cart.getUser().getId());
        response.setTotalQuantity(totalQuantity);
        response.setTotalPrice(totalPrice);
        response.setItems(itemResponses);
        return response;
    }

    public CartSummaryResponse toEmptySummary(User user) {
        CartSummaryResponse response = new CartSummaryResponse();
        response.setCartId(null);
        response.setUserId(user.getId());
        response.setTotalQuantity(0);
        response.setTotalPrice(BigDecimal.ZERO);
        response.setItems(List.of());
        return response;
    }

    private CartItemResponse toItemResponse(CartItem item) {
        ProductVariant variant = item.getVariant();
        Product product = variant.getProduct();

        BigDecimal unitPrice = getUnitPrice(product, variant);
        BigDecimal lineTotal = unitPrice.multiply(BigDecimal.valueOf(item.getQuantity()));

        CartItemResponse response = new CartItemResponse();
        response.setId(item.getId());
        response.setProductId(product.getId());
        response.setVariantId(variant.getId());
        response.setProductName(product.getProductName());
        response.setThumbnail(product.getThumbnail());
        response.setSku(variant.getSku());
        response.setVariantImage(variant.getVariantImage());
        response.setColor(toColorResponse(variant));
        response.setUnitPrice(unitPrice);
        response.setQuantity(item.getQuantity());
        response.setLineTotal(lineTotal);
        return response;
    }

    private BigDecimal getUnitPrice(Product product, ProductVariant variant) {
        BigDecimal basePrice = product.getDiscountPrice();
        if (basePrice == null || basePrice.compareTo(BigDecimal.ZERO) <= 0) {
            basePrice = product.getBasePrice();
        }
        BigDecimal additionalPrice = variant.getAdditionalPrice();
        if (additionalPrice == null) {
            additionalPrice = BigDecimal.ZERO;
        }
        return basePrice.add(additionalPrice);
    }

    private ColorResponse toColorResponse(ProductVariant variant) {
        if (variant.getColor() == null) {
            return null;
        }
        ColorResponse response = new ColorResponse();
        response.setId(variant.getColor().getId());
        response.setColorName(variant.getColor().getColorName());
        response.setColorCode(variant.getColor().getColorCode());
        return response;
    }
}
