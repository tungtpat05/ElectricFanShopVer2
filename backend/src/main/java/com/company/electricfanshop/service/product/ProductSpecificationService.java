package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.ProductSpecificationCreateRequest;
import com.company.electricfanshop.dto.product.request.ProductSpecificationUpdateRequest;
import com.company.electricfanshop.dto.product.response.ProductSpecificationResponse;
import com.company.electricfanshop.entity.product.Product;
import com.company.electricfanshop.entity.product.ProductSpecification;
import com.company.electricfanshop.entity.product.SpecDefinition;
import com.company.electricfanshop.entity.product.SpecDefinitionOption;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.mapper.product.ProductSpecificationMapper;
import com.company.electricfanshop.repository.product.ProductRepository;
import com.company.electricfanshop.repository.product.ProductSpecificationRepository;
import com.company.electricfanshop.repository.product.SpecDefinitionOptionRepository;
import com.company.electricfanshop.repository.product.SpecDefinitionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductSpecificationService {
    private final ProductSpecificationRepository productSpecificationRepository;
    private final ProductRepository productRepository;
    private final SpecDefinitionRepository specDefinitionRepository;
    private final SpecDefinitionOptionRepository specDefinitionOptionRepository;
    private final ProductSpecificationMapper productSpecificationMapper;

    public List<ProductSpecificationResponse> getAll(Integer productId) {
        List<ProductSpecification> specifications = productSpecificationRepository.findByProductId(productId);
        return specifications.stream().map(productSpecificationMapper::toResponse).toList();
    }

    public ProductSpecificationResponse getById(Integer productId, Integer specificationId) {
        ProductSpecification specification = productSpecificationRepository.findById(specificationId)
                .orElseThrow(() -> new ResourceNotFoundException(specificationId));
        if (!specification.getProduct().getId().equals(productId)) {
            throw new ResourceNotFoundException(specificationId);
        }
        return productSpecificationMapper.toResponse(specification);
    }

    @Transactional
    public ProductSpecificationResponse create(Integer productId, ProductSpecificationCreateRequest request) {
        if (productSpecificationRepository.existsByProductIdAndSpecDefinitionId(productId, request.getSpecDefinitionId())) {
            throw new IllegalArgumentException("Specification definition ID " + request.getSpecDefinitionId() + " already exists for product ID " + productId);
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(productId));

        SpecDefinition specDefinition = specDefinitionRepository.findById(request.getSpecDefinitionId())
                .orElseThrow(() -> new ResourceNotFoundException(request.getSpecDefinitionId()));

        ProductSpecification specification = productSpecificationMapper.toEntity(request);
        specification.setProduct(product);
        specification.setSpecDefinition(specDefinition);

        if (request.getOptionId() != null) {
            SpecDefinitionOption option = specDefinitionOptionRepository.findById(request.getOptionId())
                    .orElseThrow(() -> new ResourceNotFoundException(request.getOptionId()));
            specification.setOption(option);
        }

        productSpecificationRepository.save(specification);

        return productSpecificationMapper.toResponse(specification);
    }

    @Transactional
    public ProductSpecificationResponse update(Integer productId, Integer specificationId, ProductSpecificationUpdateRequest request) {
        ProductSpecification specification = productSpecificationRepository.findById(specificationId)
                .orElseThrow(() -> new ResourceNotFoundException(specificationId));

        if (!specification.getProduct().getId().equals(productId)) {
            throw new ResourceNotFoundException(specificationId);
        }

        boolean specDefChanged = !specification.getSpecDefinition().getId().equals(request.getSpecDefinitionId());
        if (specDefChanged && productSpecificationRepository.existsByProductIdAndSpecDefinitionId(productId, request.getSpecDefinitionId())) {
            throw new IllegalArgumentException("Specification definition ID " + request.getSpecDefinitionId() + " already exists for product ID " + productId);
        }

        if (specDefChanged) {
            SpecDefinition specDefinition = specDefinitionRepository.findById(request.getSpecDefinitionId())
                    .orElseThrow(() -> new ResourceNotFoundException(request.getSpecDefinitionId()));
            specification.setSpecDefinition(specDefinition);
        }

        productSpecificationMapper.updateEntityFromRequest(request, specification);

        if (request.getOptionId() != null) {
            SpecDefinitionOption option = specDefinitionOptionRepository.findById(request.getOptionId())
                    .orElseThrow(() -> new ResourceNotFoundException(request.getOptionId()));
            specification.setOption(option);
        } else {
            specification.setOption(null);
        }

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
