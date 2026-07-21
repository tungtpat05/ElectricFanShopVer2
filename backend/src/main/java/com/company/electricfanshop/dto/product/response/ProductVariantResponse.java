package com.company.electricfanshop.dto.product.response;

import lombok.*;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ProductVariantResponse {
    private Integer id;
    private Integer productId;
    private ColorResponse color;
    private String sku;
    private BigDecimal additionalPrice;
    private Integer stockQuantity;
    private String variantImage;
    private String variantImagePublicId;

    private Boolean isActive;
}

