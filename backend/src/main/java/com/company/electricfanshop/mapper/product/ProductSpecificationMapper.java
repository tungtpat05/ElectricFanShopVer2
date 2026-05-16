package com.company.electricfanshop.mapper.product;

import com.company.electricfanshop.dto.product.request.ProductSpecificationCreateRequest;
import com.company.electricfanshop.dto.product.request.ProductSpecificationUpdateRequest;
import com.company.electricfanshop.dto.product.response.ProductSpecificationResponse;
import com.company.electricfanshop.entity.product.ProductSpecification;
import org.springframework.stereotype.Component;

@Component
public class ProductSpecificationMapper {
    public ProductSpecificationResponse toResponse(ProductSpecification entity) {
        ProductSpecificationResponse dto = new ProductSpecificationResponse();

        dto.setId(entity.getId());
        dto.setProductId(entity.getProduct().getId());
        dto.setSpecKey(entity.getSpecKey());
        dto.setSpecValue(entity.getSpecValue());

        return dto;
    }

    public ProductSpecification toEntity(ProductSpecificationCreateRequest request) {
        ProductSpecification entity = new ProductSpecification();

        entity.setSpecKey(request.getSpecKey());
        entity.setSpecValue(request.getSpecValue());

        return entity;
    }

    public void updateEntityFromRequest(ProductSpecificationUpdateRequest request, ProductSpecification entity) {
        entity.setSpecKey(request.getSpecKey());
        entity.setSpecValue(request.getSpecValue());
    }
}

