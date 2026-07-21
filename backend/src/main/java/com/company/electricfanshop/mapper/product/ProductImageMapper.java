package com.company.electricfanshop.mapper.product;

import com.company.electricfanshop.dto.product.request.ProductImageCreateRequest;
import com.company.electricfanshop.dto.product.response.ProductImageResponse;
import com.company.electricfanshop.entity.product.ProductImage;
import org.springframework.stereotype.Component;

@Component
public class ProductImageMapper {
    public ProductImageResponse toResponse(ProductImage entity) {
        ProductImageResponse dto = new ProductImageResponse();

        dto.setId(entity.getId());
        dto.setImageUrl(entity.getImageUrl());
        dto.setImagePublicId(entity.getImagePublicId());
        dto.setDisplayOrder(entity.getDisplayOrder());

        return dto;
    }

    public ProductImage toEntity(ProductImageCreateRequest request) {
        ProductImage entity = new ProductImage();

        entity.setImageUrl(request.getImageUrl());
        entity.setImagePublicId(request.getImagePublicId());

        return entity;
    }
}
