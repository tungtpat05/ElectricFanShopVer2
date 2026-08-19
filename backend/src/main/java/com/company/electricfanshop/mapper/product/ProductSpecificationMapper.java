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
        dto.setProductId(entity.getProduct() != null ? entity.getProduct().getId() : null);

        if (entity.getSpecDefinition() != null) {
            dto.setSpecDefinitionId(entity.getSpecDefinition().getId());
            dto.setDisplayName(entity.getSpecDefinition().getDisplayName());
            dto.setKeyCode(entity.getSpecDefinition().getKeyCode());
            dto.setDataType(entity.getSpecDefinition().getDataType());
            dto.setUnit(entity.getSpecDefinition().getUnit());
        }

        dto.setValue(entity.getValue());
        dto.setValueNumber(entity.getValueNumber());

        if (entity.getOption() != null) {
            dto.setOptionId(entity.getOption().getId());
            dto.setOptionValue(entity.getOption().getOptionValue());
        }

        return dto;
    }

    public ProductSpecification toEntity(ProductSpecificationCreateRequest request) {
        ProductSpecification entity = new ProductSpecification();
        entity.setValue(request.getValue());
        entity.setValueNumber(request.getValueNumber());
        return entity;
    }

    public void updateEntityFromRequest(ProductSpecificationUpdateRequest request, ProductSpecification entity) {
        entity.setValue(request.getValue());
        entity.setValueNumber(request.getValueNumber());
    }
}
