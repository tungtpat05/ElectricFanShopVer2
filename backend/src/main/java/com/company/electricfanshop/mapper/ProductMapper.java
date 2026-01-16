package com.company.electricfanshop.mapper;

import org.springframework.stereotype.Component;

import com.company.electricfanshop.dto.product.response.ProductResponse;
import com.company.electricfanshop.entity.Product;

@Component
public class ProductMapper {
    public ProductResponse toResponse (Product entity) {
        ProductResponse dto = new ProductResponse();

        dto.setId(entity.getId());
        dto.setProductName(entity.getProductName());
        dto.setDescription(entity.getDescription());
        dto.setPrice(entity.getPrice());
        dto.setImage(entity.getImage());
        dto.setStock(entity.getStock());

        return dto;
    }
}