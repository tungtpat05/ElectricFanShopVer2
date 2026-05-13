package com.company.electricfanshop.dto.cart.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartSummaryResponse {
    private Integer cartId;
    private Integer userId;
    private Integer totalQuantity;
    private BigDecimal totalPrice;
    private List<CartItemResponse> items;
}

