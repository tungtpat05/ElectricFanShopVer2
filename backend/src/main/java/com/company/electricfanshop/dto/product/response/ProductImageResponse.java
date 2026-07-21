package com.company.electricfanshop.dto.product.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ProductImageResponse {
    private Integer id;
    private String imageUrl;
    private String imagePublicId;
    private Integer displayOrder;
}

