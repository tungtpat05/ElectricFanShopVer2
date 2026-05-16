package com.company.electricfanshop.dto.product.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ProductSpecificationResponse {
    private Integer id;
    private Integer productId;
    private String specKey;
    private String specValue;
}

