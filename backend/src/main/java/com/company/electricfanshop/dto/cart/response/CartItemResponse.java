package com.company.electricfanshop.dto.cart.response;

import com.company.electricfanshop.dto.product.response.ColorResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponse {
    private Integer id;
    private Integer productId;
    private Integer variantId;
    private String productName;
    private String thumbnail;
    private String sku;
    private String variantImage;
    private ColorResponse color;
    private BigDecimal unitPrice;
    private Integer quantity;
    private BigDecimal lineTotal;
}

