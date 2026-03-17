package com.company.electricfanshop.mapper.product;

import com.company.electricfanshop.dto.product.request.BrandCreateRequest;
import com.company.electricfanshop.dto.product.response.BrandResponse;
import com.company.electricfanshop.entity.product.Brand;
import org.springframework.stereotype.Component;

@Component
public class BrandMapper {
    public BrandResponse toResponse(Brand entity) {
        BrandResponse dto = new BrandResponse();

        dto.setId(entity.getId());
        dto.setBrandName(entity.getBrandName());
        dto.setLogoUrl(entity.getLogoUrl());
        dto.setDescription(entity.getDescription());
        dto.setIsActive(entity.getIsActive());

        return dto;
    }

    public Brand toEntity(BrandCreateRequest request) {
        Brand dto = new Brand();

        dto.setBrandName(request.getBrandName());
        dto.setLogoUrl(request.getLogoUrl());
        dto.setDescription(request.getDescription());

        return dto;
    }
}
