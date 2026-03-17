package com.company.electricfanshop.service.product;

import java.util.List;

import com.company.electricfanshop.dto.product.request.ProductCreateRequest;
import com.company.electricfanshop.dto.product.request.ProductUpdateRequest;
import com.company.electricfanshop.dto.product.response.ProductResponse;

public interface ProductService {
    List<ProductResponse> getAll();

    ProductResponse getById(Integer id);

    List<ProductResponse> getByCategoryId(Integer categoryId);

    ProductResponse create(ProductCreateRequest request);

    ProductResponse update(Integer id, ProductUpdateRequest request);

}
