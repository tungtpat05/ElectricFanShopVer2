package com.company.electricfanshop.mapper.product;

import com.company.electricfanshop.dto.product.request.SpecDefinitionCreateRequest;
import com.company.electricfanshop.dto.product.request.SpecDefinitionOptionCreateRequest;
import com.company.electricfanshop.dto.product.request.SpecDefinitionUpdateRequest;
import com.company.electricfanshop.dto.product.response.SpecDefinitionOptionResponse;
import com.company.electricfanshop.dto.product.response.SpecDefinitionResponse;
import com.company.electricfanshop.entity.product.SpecDefinition;
import com.company.electricfanshop.entity.product.SpecDefinitionOption;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class SpecDefinitionMapper {

    public SpecDefinitionResponse toResponse(SpecDefinition entity) {
        SpecDefinitionResponse dto = new SpecDefinitionResponse();
        dto.setId(entity.getId());
        dto.setCategoryId(entity.getCategory() != null ? entity.getCategory().getId() : null);
        dto.setKeyCode(entity.getKeyCode());
        dto.setDisplayName(entity.getDisplayName());
        dto.setDataType(entity.getDataType());
        dto.setUnit(entity.getUnit());
        dto.setDisplayOrder(entity.getDisplayOrder());
        dto.setIsRequired(entity.getIsRequired());
        dto.setIsActive(entity.getIsActive());

        if (entity.getOptions() != null) {
            dto.setOptions(entity.getOptions().stream().map(this::optionToResponse).toList());
        } else {
            dto.setOptions(new ArrayList<>());
        }

        return dto;
    }

    public SpecDefinitionOptionResponse optionToResponse(SpecDefinitionOption entity) {
        SpecDefinitionOptionResponse dto = new SpecDefinitionOptionResponse();
        dto.setId(entity.getId());
        dto.setOptionValue(entity.getOptionValue());
        dto.setDisplayOrder(entity.getDisplayOrder());
        return dto;
    }

    public SpecDefinition toEntity(SpecDefinitionCreateRequest request) {
        SpecDefinition entity = new SpecDefinition();
        entity.setKeyCode(request.getKeyCode());
        entity.setDisplayName(request.getDisplayName());
        entity.setDataType(request.getDataType());
        entity.setUnit(request.getUnit());
        entity.setDisplayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0);
        entity.setIsRequired(request.getIsRequired() != null && request.getIsRequired());
        entity.setIsActive(true);
        return entity;
    }

    public SpecDefinitionOption optionToEntity(SpecDefinitionOptionCreateRequest request) {
        SpecDefinitionOption entity = new SpecDefinitionOption();
        entity.setOptionValue(request.getOptionValue());
        entity.setDisplayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0);
        return entity;
    }

    public void updateEntityFromRequest(SpecDefinitionUpdateRequest request, SpecDefinition entity) {
        entity.setKeyCode(request.getKeyCode());
        entity.setDisplayName(request.getDisplayName());
        entity.setDataType(request.getDataType());
        entity.setUnit(request.getUnit());
        if (request.getDisplayOrder() != null) {
            entity.setDisplayOrder(request.getDisplayOrder());
        }
        if (request.getIsRequired() != null) {
            entity.setIsRequired(request.getIsRequired());
        }
        if (request.getIsActive() != null) {
            entity.setIsActive(request.getIsActive());
        }
    }
}
