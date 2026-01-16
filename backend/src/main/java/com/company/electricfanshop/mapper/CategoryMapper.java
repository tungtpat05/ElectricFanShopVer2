package com.company.electricfanshop.mapper;

import org.springframework.stereotype.Component;

import com.company.electricfanshop.dto.category.response.CategoryResponse;
import com.company.electricfanshop.entity.Category;

@Component
public class CategoryMapper {
    public CategoryResponse toResponse (Category entity) {
        CategoryResponse dto = new CategoryResponse();

        dto.setId(entity.getId());
        dto.setCategoryName(entity.getCategoryName());
        dto.setDescription(entity.getDescription());

        return dto;
    }
}