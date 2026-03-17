package com.company.electricfanshop.dto.product.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BrandUpdateRequest {
    private String brandName;
    private String logoUrl;
    private String description;
    private Boolean isActive;
}
