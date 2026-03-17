package com.company.electricfanshop.dto.product.response;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductListResponse {
    private Integer id;
    private String productName;
    private String description;
    private BigDecimal price;
    private String image;
    private Integer stock;    
}