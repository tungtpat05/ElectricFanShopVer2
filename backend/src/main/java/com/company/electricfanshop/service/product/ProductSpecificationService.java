package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.ProductSpecificationCreateRequest;
import com.company.electricfanshop.dto.product.request.ProductSpecificationUpdateRequest;
import com.company.electricfanshop.dto.product.response.ProductSpecificationResponse;
import com.company.electricfanshop.entity.product.Product;
import com.company.electricfanshop.entity.product.ProductSpecification;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.mapper.product.ProductSpecificationMapper;
import com.company.electricfanshop.repository.product.ProductRepository;
import com.company.electricfanshop.repository.product.ProductSpecificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductSpecificationService {
    private final ProductSpecificationRepository productSpecificationRepository;
    private final ProductRepository productRepository;
    private final ProductSpecificationMapper productSpecificationMapper;

    public List<ProductSpecificationResponse> getAll(Integer productId) {
        List<ProductSpecification> specifications = productSpecificationRepository.findByProductId(productId);
        return specifications.stream().map(productSpecificationMapper::toResponse).toList();
    }

    public ProductSpecificationResponse getById(Integer productId, Integer specificationId) {
        ProductSpecification specification = productSpecificationRepository.findById(specificationId)
                .orElseThrow(() -> new ResourceNotFoundException(specificationId));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(productId));
        return productSpecificationMapper.toResponse(specification);
    }

    @Transactional
    public ProductSpecificationResponse create(Integer productId, ProductSpecificationCreateRequest request) {
        if (productSpecificationRepository.existsByProductIdAndSpecKey(productId, request.getSpecKey())) {
            throw new ResourceNotFoundException(request.getSpecKey());
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(productId));

        ProductSpecification specification = productSpecificationMapper.toEntity(request);
        specification.setProduct(product);

        productSpecificationRepository.save(specification);

        if (product.getSpecifications() != null) {
            product.getSpecifications().add(specification);
        }

        return productSpecificationMapper.toResponse(specification);
    }

    @Transactional
    public ProductSpecificationResponse update(Integer productId, Integer specificationId, ProductSpecificationUpdateRequest request) {
        ProductSpecification specification = productSpecificationRepository.findById(specificationId)
                .orElseThrow(() -> new ResourceNotFoundException(specificationId));

        if (!specification.getProduct().getId().equals(productId)) {
            throw new ResourceNotFoundException(specificationId);
        }

        boolean keyChanged = !specification.getSpecKey().equals(request.getSpecKey());
        if (keyChanged && productSpecificationRepository.existsByProductIdAndSpecKey(productId, request.getSpecKey())) {
            throw new ResourceNotFoundException(request.getSpecKey());
        }

        productSpecificationMapper.updateEntityFromRequest(request, specification);
        productSpecificationRepository.save(specification);

        return productSpecificationMapper.toResponse(specification);
    }

    @Transactional
    public void delete(Integer productId, Integer specificationId) {
        ProductSpecification specification = productSpecificationRepository.findById(specificationId)
                .orElseThrow(() -> new ResourceNotFoundException(specificationId));

        if (!specification.getProduct().getId().equals(productId)) {
            throw new ResourceNotFoundException(specificationId);
        }

        productSpecificationRepository.delete(specification);
    }
}

