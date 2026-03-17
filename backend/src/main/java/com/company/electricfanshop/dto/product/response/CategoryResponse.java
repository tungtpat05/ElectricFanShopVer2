package com.company.electricfanshop.dto.product.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse {
    private Integer id;
    private String categoryName;
    private String slug;
    private String categoryImage;
    private String description;
    private Boolean isActive;
}
