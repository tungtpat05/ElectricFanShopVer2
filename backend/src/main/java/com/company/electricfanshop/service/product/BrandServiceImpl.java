package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.BrandCreateRequest;
import com.company.electricfanshop.dto.product.request.BrandUpdateRequest;
import com.company.electricfanshop.dto.product.response.BrandResponse;
import com.company.electricfanshop.entity.product.Brand;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.mapper.product.BrandMapper;
import com.company.electricfanshop.repository.product.BrandRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BrandServiceImpl implements BrandService {
    private BrandRepository brandRepository;
    private BrandMapper brandMapper;

    @Override
    public List<BrandResponse> getAll() {
        List<Brand> brands = brandRepository.findAll();
        return brands.stream().map(brand -> brandMapper.toResponse(brand)).toList();
    }

    @Override
    public BrandResponse getById(Integer id) {
        Brand brand = brandRepository.findById(id).orElse(null);
        if (brand == null) {
            return null;
        } else {
            return brandMapper.toResponse(brand);
        }
    }

    @Override
    public BrandResponse create(BrandCreateRequest request) {
        Brand brand = brandMapper.toEntity(request);
        brandRepository.save(brand);
        return brandMapper.toResponse(brand);
    }

    @Override
    public BrandResponse update(Integer id, BrandUpdateRequest request) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));

        brand.setBrandName(request.getBrandName());
        brand.setLogoUrl(request.getLogoUrl());
        brand.setDescription(request.getDescription());
        brand.setIsActive(request.getIsActive());

        brandRepository.save(brand);
        return brandMapper.toResponse(brand);
    }

}
