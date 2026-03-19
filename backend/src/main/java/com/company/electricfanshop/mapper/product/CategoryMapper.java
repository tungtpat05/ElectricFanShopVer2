package com.company.electricfanshop.mapper.product;

import com.company.electricfanshop.dto.product.request.BrandCreateRequest;
import com.company.electricfanshop.dto.product.request.CategoryCreateRequest;
import com.company.electricfanshop.dto.product.request.CategoryUpdateRequest;
import com.company.electricfanshop.dto.product.response.BrandResponse;
import com.company.electricfanshop.entity.product.Brand;
import org.springframework.stereotype.Component;

import com.company.electricfanshop.dto.product.response.CategoryResponse;
import com.company.electricfanshop.entity.product.Category;

@Component
public class CategoryMapper {
    public CategoryResponse toResponse (Category entity) {
        CategoryResponse dto = new CategoryResponse();

        dto.setId(entity.getId());
        dto.setCategoryName(entity.getCategoryName());
        dto.setSlug(entity.getSlug());
        dto.setCategoryImage(entity.getCategoryImage());
        dto.setDescription(entity.getDescription());
        dto.setIsActive(entity.getIsActive());

        return dto;
    }

    public Category toEntity(CategoryCreateRequest request) {
        Category dto = new Category();

        dto.setCategoryName(request.getCategoryName());
        dto.setSlug(request.getSlug());
        dto.setCategoryImage(request.getCategoryImage());
        dto.setDescription(request.getDescription());

        return dto;
    }

    public void updateEntityFromRequest(CategoryUpdateRequest request, Category category) {
        category.setCategoryName(request.getCategoryName());
        category.setSlug(request.getSlug());
        category.setCategoryImage(request.getCategoryImage());
        category.setDescription(request.getDescription());
        category.setIsActive(request.getIsActive());
    }
}