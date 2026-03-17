package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.BrandCreateRequest;
import com.company.electricfanshop.dto.product.request.BrandUpdateRequest;
import com.company.electricfanshop.dto.product.request.ColorCreateRequest;
import com.company.electricfanshop.dto.product.request.ColorUpdateRequest;
import com.company.electricfanshop.dto.product.response.BrandResponse;
import com.company.electricfanshop.dto.product.response.ColorResponse;

import java.util.List;

public interface ColorService {

    List<ColorResponse> getAll();

    ColorResponse getById(Integer id);

    ColorResponse create(ColorCreateRequest request);

    ColorResponse update(Integer id, ColorUpdateRequest request);

}
