package com.company.electricfanshop.dto.product.request;

import lombok.*;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductCreateRequest {
    private String productName;
    private String slug;
    private Integer brandId;
    private Integer categoryId;
    private String summary;
    private String description;
    private BigDecimal basePrice;
    private BigDecimal discountPrice;
    private String thumbnail;
    private Integer weightGram;
    private Integer lengthCm;
    private Integer widthCm;
    private Integer heightCm;
    private Boolean isFeatured;
}

