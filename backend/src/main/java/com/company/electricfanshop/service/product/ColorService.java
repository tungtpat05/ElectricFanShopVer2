package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.ColorCreateRequest;
import com.company.electricfanshop.dto.product.request.ColorUpdateRequest;
import com.company.electricfanshop.dto.product.response.ColorResponse;
import com.company.electricfanshop.entity.product.Color;
import com.company.electricfanshop.exception.DuplicateResourceException;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.mapper.product.ColorMapper;
import com.company.electricfanshop.repository.product.ColorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ColorService {
    private final ColorRepository colorRepository;
    private final ColorMapper colorMapper;

    public List<ColorResponse> getAll() {
        List<Color> colors = colorRepository.findAll();
        return colors.stream().map(colorMapper::toResponse).toList();
    }
    public ColorResponse getById(Integer id) {
        Color color = colorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Color", "id", id));
        return colorMapper.toResponse(color);
    }

    public ColorResponse create(ColorCreateRequest request) {
        if(colorRepository.existsByColorName(request.getColorName())) {
            throw new DuplicateResourceException("Color", "name", request.getColorName());
        }
        Color color = colorMapper.toEntity(request);
        colorRepository.save(color);
        return colorMapper.toResponse(color);
    }

    public ColorResponse update(Integer id, ColorUpdateRequest request) {
        Color color = colorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Color", "id", id));

        colorMapper.updateEntityFromRequest(request, color);

        colorRepository.save(color);
        return colorMapper.toResponse(color);
    }

}
