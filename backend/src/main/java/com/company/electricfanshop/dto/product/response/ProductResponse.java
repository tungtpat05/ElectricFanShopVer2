package com.company.electricfanshop.dto.product.response;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ProductResponse {
    private Integer id;
    private String productName;
    private String slug;
    private BrandResponse brand;
    private CategoryResponse category;
    private String summary;
    private String description;
    private BigDecimal basePrice;
    private BigDecimal discountPrice;
    private String thumbnail;
    private String thumbnailPublicId;
    private Integer engineCapacity;
    private Integer weightGram;
    private Integer lengthCm;
    private Integer widthCm;
    private Integer heightCm;

    private Boolean isFeatured;
    private Boolean isActive;
    private LocalDateTime createdAt;
}
