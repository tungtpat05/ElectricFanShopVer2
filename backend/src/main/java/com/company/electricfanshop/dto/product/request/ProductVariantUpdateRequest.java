package com.company.electricfanshop.dto.product.request;

import lombok.*;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductVariantUpdateRequest {
    private Integer colorId;
    private String sku;
    private BigDecimal additionalPrice;
    private Integer stockQuantity;
    private String variantImage;
    private Boolean isActive;
}

