package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.BrandCreateRequest;
import com.company.electricfanshop.dto.product.request.BrandUpdateRequest;
import com.company.electricfanshop.dto.product.request.CategoryCreateRequest;
import com.company.electricfanshop.dto.product.request.CategoryUpdateRequest;
import com.company.electricfanshop.dto.product.response.BrandResponse;
import com.company.electricfanshop.dto.product.response.CategoryResponse;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> getAll();

    CategoryResponse getById(Integer id);

    CategoryResponse create(CategoryCreateRequest request);

    CategoryResponse update(Integer id, CategoryUpdateRequest request);

}
