package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.BrandCreateRequest;
import com.company.electricfanshop.dto.product.request.BrandUpdateRequest;
import com.company.electricfanshop.dto.product.response.BrandResponse;
import com.company.electricfanshop.entity.product.Brand;
import com.company.electricfanshop.exception.DuplicateResourceException;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.mapper.product.BrandMapper;
import com.company.electricfanshop.repository.product.BrandRepository;
import com.company.electricfanshop.service.storage.ImageStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandService {
    private final BrandRepository brandRepository;
    private final BrandMapper brandMapper;
    private final ImageStorageService imageStorageService;

    public List<BrandResponse> getAll() {
        List<Brand> brands = brandRepository.findAll();
        return brands.stream().map(brandMapper::toResponse).toList();
    }

    public BrandResponse getById(Integer id) {
        Brand brand = brandRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException(id));
        return brandMapper.toResponse(brand);
    }

    public BrandResponse create(BrandCreateRequest request) {
        if(brandRepository.existsByBrandName(request.getBrandName())) {
            throw new DuplicateResourceException(request.getBrandName());
        }
        Brand brand = brandMapper.toEntity(request);
        brandRepository.save(brand);
        return brandMapper.toResponse(brand);
    }

    public BrandResponse update(Integer id, BrandUpdateRequest request) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));

        String oldPublicId = brand.getLogoPublicId();
        String newPublicId = request.getLogoPublicId();

        if (oldPublicId != null && !oldPublicId.isEmpty() && (newPublicId == null || !oldPublicId.equals(newPublicId))) {
            imageStorageService.delete(oldPublicId);
        }

        brandMapper.updateEntiryFromRequest(request, brand);

        brandRepository.save(brand);
        return brandMapper.toResponse(brand);
    }


    public Brand getEntityById(Integer id) {
        return brandRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException(id));
    }
}
