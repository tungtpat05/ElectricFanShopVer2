package com.company.electricfanshop.mapper.product;

import com.company.electricfanshop.dto.product.request.ColorCreateRequest;
import com.company.electricfanshop.dto.product.response.ColorResponse;
import com.company.electricfanshop.entity.product.Color;
import org.springframework.stereotype.Component;

@Component
public class ColorMapper {
    public ColorResponse toResponse(Color entity) {
        ColorResponse dto = new ColorResponse();

        dto.setId(entity.getId());
        dto.setColorName(entity.getColorName());
        dto.setColorCode(entity.getColorCode());

        return dto;
    }

    public Color toEntity(ColorCreateRequest request) {
        Color dto = new Color();

        dto.setColorName(request.getColorName());
        dto.setColorCode(request.getColorCode());

        return dto;
    }

}
