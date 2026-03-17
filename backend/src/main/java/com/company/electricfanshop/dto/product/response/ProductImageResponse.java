package com.company.electricfanshop.dto.product.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ProductImageResponse {
    private Integer id;
    private Integer productId;
    private String imageUrl;
    private Integer displayOrder;
}

