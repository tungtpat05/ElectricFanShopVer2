package com.company.electricfanshop.mapper.product;

import com.company.electricfanshop.dto.product.request.ProductUpdateRequest;
import org.springframework.stereotype.Component;

import com.company.electricfanshop.dto.product.request.ProductCreateRequest;
import com.company.electricfanshop.dto.product.response.BrandResponse;
import com.company.electricfanshop.dto.product.response.CategoryResponse;
import com.company.electricfanshop.dto.product.response.ProductResponse;
import com.company.electricfanshop.entity.product.Product;

@Component
public class ProductMapper {

    public ProductResponse toResponse(Product entity) {
        ProductResponse dto = new ProductResponse();

        dto.setId(entity.getId());
        dto.setProductName(entity.getProductName());
        dto.setSlug(entity.getSlug());
        dto.setSummary(entity.getSummary());
        dto.setDescription(entity.getDescription());
        dto.setBasePrice(entity.getBasePrice());
        dto.setDiscountPrice(entity.getDiscountPrice());
        dto.setThumbnail(entity.getThumbnail());
        dto.setWeightGram(entity.getWeightGram());
        dto.setLengthCm(entity.getLengthCm());
        dto.setWidthCm(entity.getWidthCm());
        dto.setHeightCm(entity.getHeightCm());
        dto.setIsFeatured(entity.getIsFeatured());
        dto.setIsActive(entity.getIsActive());
        dto.setCreatedAt(entity.getCreatedAt());

        // Map Brand
        if (entity.getBrand() != null) {
            BrandResponse brandResponse = new BrandResponse();
            brandResponse.setId(entity.getBrand().getId());
            brandResponse.setBrandName(entity.getBrand().getBrandName());
            brandResponse.setLogoUrl(entity.getBrand().getLogoUrl());
            brandResponse.setDescription(entity.getBrand().getDescription());
            brandResponse.setIsActive(entity.getBrand().getIsActive());
            dto.setBrand(brandResponse);
        }

        // Map Category
        if (entity.getCategory() != null) {
            CategoryResponse categoryResponse = new CategoryResponse();
            categoryResponse.setId(entity.getCategory().getId());
            categoryResponse.setCategoryName(entity.getCategory().getCategoryName());
            categoryResponse.setSlug(entity.getCategory().getSlug());
            categoryResponse.setCategoryImage(entity.getCategory().getCategoryImage());
            categoryResponse.setDescription(entity.getCategory().getDescription());
            categoryResponse.setIsActive(entity.getCategory().getIsActive());
            dto.setCategory(categoryResponse);
        }

        return dto;
    }

    public Product toEntity(ProductCreateRequest request) {
        Product entity = new Product();

        entity.setProductName(request.getProductName());
        entity.setSlug(request.getSlug());
        entity.setSummary(request.getSummary());
        entity.setDescription(request.getDescription());
        entity.setBasePrice(request.getBasePrice());
        entity.setDiscountPrice(request.getDiscountPrice());
        entity.setThumbnail(request.getThumbnail());
        entity.setWeightGram(request.getWeightGram());
        entity.setLengthCm(request.getLengthCm());
        entity.setWidthCm(request.getWidthCm());
        entity.setHeightCm(request.getHeightCm());
        entity.setIsFeatured(request.getIsFeatured());
        return entity;
    }

    public void updateEntityFromRequest(ProductUpdateRequest request, Product entity) {
        entity.setProductName(request.getProductName());
        entity.setSlug(request.getSlug());
        entity.setSummary(request.getSummary());
        entity.setDescription(request.getDescription());
        entity.setBasePrice(request.getBasePrice());
        entity.setDiscountPrice(request.getDiscountPrice());
        entity.setThumbnail(request.getThumbnail());
        entity.setWeightGram(request.getWeightGram());
        entity.setLengthCm(request.getLengthCm());
        entity.setWidthCm(request.getWidthCm());
        entity.setHeightCm(request.getHeightCm());
        entity.setIsFeatured(request.getIsFeatured());
        entity.setIsActive(request.getIsActive());
    }
}
