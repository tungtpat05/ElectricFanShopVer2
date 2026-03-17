package com.company.electricfanshop.dto.product.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CategoryCreateRequest {
    private String categoryName;
    private String slug;
    private String categoryImage;
    private String description;
}
