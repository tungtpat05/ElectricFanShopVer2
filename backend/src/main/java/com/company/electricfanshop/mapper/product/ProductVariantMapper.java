package com.company.electricfanshop.mapper.product;

import com.company.electricfanshop.dto.product.request.ProductVariantCreateRequest;
import com.company.electricfanshop.dto.product.request.ProductVariantUpdateRequest;
import com.company.electricfanshop.dto.product.response.ColorResponse;
import com.company.electricfanshop.dto.product.response.ProductVariantResponse;
import com.company.electricfanshop.entity.product.ProductVariant;
import org.springframework.stereotype.Component;

@Component
public class ProductVariantMapper {
    public ProductVariantResponse toResponse(ProductVariant entity) {
        ProductVariantResponse dto = new ProductVariantResponse();

        dto.setId(entity.getId());
        dto.setProductId(entity.getProduct().getId());
        dto.setSku(entity.getSku());
        dto.setAdditionalPrice(entity.getAdditionalPrice());
        dto.setStockQuantity(entity.getStockQuantity());
        dto.setVariantImage(entity.getVariantImage());
        dto.setVariantImagePublicId(entity.getVariantImagePublicId());
        dto.setIsActive(entity.getIsActive());

        // Map color to response
        if (entity.getColor() != null) {
            ColorResponse colorResponse = new ColorResponse();
            colorResponse.setId(entity.getColor().getId());
            colorResponse.setColorName(entity.getColor().getColorName());
            colorResponse.setColorCode(entity.getColor().getColorCode());
            dto.setColor(colorResponse);
        }

        return dto;
    }

    public ProductVariant toEntity(ProductVariantCreateRequest request) {
        ProductVariant entity = new ProductVariant();

        entity.setSku(request.getSku());
        entity.setAdditionalPrice(request.getAdditionalPrice() != null ? request.getAdditionalPrice() : java.math.BigDecimal.ZERO);
        entity.setStockQuantity(request.getStockQuantity() != null ? request.getStockQuantity() : 0);
        entity.setVariantImage(request.getVariantImage());
        entity.setVariantImagePublicId(request.getVariantImagePublicId());

        return entity;
    }

    public void updateEntityFromRequest(ProductVariantUpdateRequest request, ProductVariant variant) {
        variant.setSku(request.getSku());
        variant.setAdditionalPrice(request.getAdditionalPrice());
        variant.setStockQuantity(request.getStockQuantity());
        variant.setVariantImage(request.getVariantImage());
        variant.setVariantImagePublicId(request.getVariantImagePublicId());
        variant.setIsActive(request.getIsActive());
    }
}


