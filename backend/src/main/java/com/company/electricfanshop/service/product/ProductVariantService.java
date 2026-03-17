package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.ProductVariantCreateRequest;
import com.company.electricfanshop.dto.product.request.ProductVariantUpdateRequest;
import com.company.electricfanshop.dto.product.response.ProductVariantResponse;

import java.util.List;

public interface ProductVariantService {

    List<ProductVariantResponse> getByProductId(Integer productId);

    ProductVariantResponse getById(Integer id);

    ProductVariantResponse create(ProductVariantCreateRequest request);

    ProductVariantResponse update(Integer id, ProductVariantUpdateRequest request);

}

