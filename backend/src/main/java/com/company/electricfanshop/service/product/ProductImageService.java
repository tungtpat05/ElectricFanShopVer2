package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.ProductImageCreateRequest;
import com.company.electricfanshop.dto.product.request.ProductImageUpdateRequest;
import com.company.electricfanshop.dto.product.response.ProductImageResponse;

import java.util.List;

public interface ProductImageService {

    List<ProductImageResponse> getByProductId(Integer productId);

    ProductImageResponse getById(Integer id);

    ProductImageResponse create(ProductImageCreateRequest request);

    ProductImageResponse update(Integer id, ProductImageUpdateRequest request);

}

