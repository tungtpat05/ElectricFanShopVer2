package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.CategoryCreateRequest;
import com.company.electricfanshop.dto.product.request.CategoryUpdateRequest;
import com.company.electricfanshop.dto.product.request.ColorCreateRequest;
import com.company.electricfanshop.dto.product.request.ColorUpdateRequest;
import com.company.electricfanshop.dto.product.response.BrandResponse;
import com.company.electricfanshop.dto.product.response.CategoryResponse;
import com.company.electricfanshop.dto.product.response.ColorResponse;
import com.company.electricfanshop.entity.product.Brand;
import com.company.electricfanshop.entity.product.Category;
import com.company.electricfanshop.entity.product.Color;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.mapper.product.BrandMapper;
import com.company.electricfanshop.mapper.product.ColorMapper;
import com.company.electricfanshop.repository.product.BrandRepository;
import com.company.electricfanshop.repository.product.ColorRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ColorServiceImpl implements ColorService {
    private ColorRepository colorRepository;
    private ColorMapper colorMapper;

    @Override
    public List<ColorResponse> getAll() {
        List<Color> colors = colorRepository.findAll();
        return colors.stream().map(color -> colorMapper.toResponse(color)).toList();
    }
    @Override
    public ColorResponse getById(Integer id) {
        Color color = colorRepository.findById(id).orElse(null);
        if (color == null) {
            return null;
        } else {
            return colorMapper.toResponse(color);
        }
    }

    @Override
    public ColorResponse create(ColorCreateRequest request) {
        Color color = colorMapper.toEntity(request);
        colorRepository.save(color);
        return colorMapper.toResponse(color);
    }

    @Override
    public ColorResponse update(Integer id, ColorUpdateRequest request) {
        Color color = colorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));

        color.setColorName(request.getColorName());
        color.setColorCode(request.getColorCode());
        colorRepository.save(color);
        return colorMapper.toResponse(color);
    }

}
