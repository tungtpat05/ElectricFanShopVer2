package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.ProductVariantCreateRequest;
import com.company.electricfanshop.dto.product.request.ProductVariantUpdateRequest;
import com.company.electricfanshop.dto.product.response.ProductVariantResponse;
import com.company.electricfanshop.entity.product.Color;
import com.company.electricfanshop.entity.product.Product;
import com.company.electricfanshop.entity.product.ProductVariant;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.mapper.product.ProductVariantMapper;
import com.company.electricfanshop.repository.product.ColorRepository;
import com.company.electricfanshop.repository.product.ProductRepository;
import com.company.electricfanshop.repository.product.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductVariantService {
    private final ProductVariantRepository productVariantRepository;
    private final ProductRepository productRepository;
    private final ColorRepository colorRepository;
    private final ProductVariantMapper productVariantMapper;

    public List<ProductVariantResponse> getAll(Integer productId) {
        List<ProductVariant> variants = productVariantRepository.findByProductId(productId);
        return variants.stream().map(productVariantMapper::toResponse).toList();
    }

    public ProductVariantResponse getById(Integer productId, Integer variantId) {
        ProductVariant variant = productVariantRepository.findById(variantId)
                .orElseThrow(() -> new ResourceNotFoundException(variantId));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(productId));
        return productVariantMapper.toResponse(variant);
    }

    @Transactional
    public ProductVariantResponse create(Integer productId, ProductVariantCreateRequest request) {
        if(productVariantRepository.existsBySku(request.getSku())) {
            throw new ResourceNotFoundException(request.getSku());
        }
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(productId));
        Color color = colorRepository.findById(request.getColorId())
                .orElseThrow(() -> new ResourceNotFoundException(request.getColorId()));

        ProductVariant variant = productVariantMapper.toEntity(request);

        variant.setProduct(product);
        variant.setColor(color);
        productVariantRepository.save(variant);

        product.getVariants().add(variant);

        return productVariantMapper.toResponse(variant);
    }

    @Transactional
    public ProductVariantResponse update(Integer productId, Integer variantId, ProductVariantUpdateRequest request) {
        ProductVariant variant = productVariantRepository.findById(variantId)
                .orElseThrow(() -> new ResourceNotFoundException(variantId));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(productId));
        Color color = colorRepository.findById(request.getColorId())
                .orElseThrow(() -> new ResourceNotFoundException(request.getColorId()));

        productVariantMapper.updateEntityFromRequest(request, variant);
        variant.setColor(color);
        productVariantRepository.save(variant);

        return productVariantMapper.toResponse(variant);
    }

}

