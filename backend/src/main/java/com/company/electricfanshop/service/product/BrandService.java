package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.BrandCreateRequest;
import com.company.electricfanshop.dto.product.request.BrandUpdateRequest;
import com.company.electricfanshop.dto.product.response.BrandResponse;

import java.util.List;

public interface BrandService {

    List<BrandResponse> getAll();

    BrandResponse getById(Integer id);

    BrandResponse create(BrandCreateRequest request);

    BrandResponse update(Integer id, BrandUpdateRequest request);

}
