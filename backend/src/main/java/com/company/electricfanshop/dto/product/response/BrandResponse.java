package com.company.electricfanshop.dto.product.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class BrandResponse {
    private Integer id;
    private String brandName;
    private String logoUrl;
    private String logoPublicId;

    private String description;

    private Boolean isActive;
}
