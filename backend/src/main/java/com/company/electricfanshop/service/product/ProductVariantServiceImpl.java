package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.ProductVariantCreateRequest;
import com.company.electricfanshop.dto.product.request.ProductVariantUpdateRequest;
import com.company.electricfanshop.dto.product.response.ProductVariantResponse;
import com.company.electricfanshop.entity.product.ProductVariant;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.mapper.product.ProductVariantMapper;
import com.company.electricfanshop.repository.product.ProductRepository;
import com.company.electricfanshop.repository.product.ProductVariantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductVariantServiceImpl implements ProductVariantService {
    private ProductVariantRepository productVariantRepository;
    private ProductRepository productRepository;
    private ProductVariantMapper productVariantMapper;

    @Override
    public List<ProductVariantResponse> getByProductId(Integer productId) {
        List<ProductVariant> variants = productVariantRepository.findByProductId(productId);
        return variants.stream().map(variant -> productVariantMapper.toResponse(variant)).toList();
    }

    @Override
    public ProductVariantResponse getById(Integer id) {
        ProductVariant variant = productVariantRepository.findById(id).orElse(null);
        if (variant == null) {
            return null;
        } else {
            return productVariantMapper.toResponse(variant);
        }
    }

    @Override
    public ProductVariantResponse create(ProductVariantCreateRequest request) {
        ProductVariant variant = productVariantMapper.toEntity(request);

        // Set product from request
        var product = productRepository.findById(request.getProductId()).orElse(null);
        if (product == null) {
            return null;
        }
        variant.setProduct(product);
        productVariantRepository.save(variant);

        // Set product variant to product's variant list
        product.getVariants().add(variant);

        return productVariantMapper.toResponse(variant);
    }

    @Override
    public ProductVariantResponse update(Integer id, ProductVariantUpdateRequest request) {
        ProductVariant variant = productVariantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));

        variant.setSku(request.getSku());
        variant.setAdditionalPrice(request.getAdditionalPrice());
        variant.setStockQuantity(request.getStockQuantity());
        variant.setVariantImage(request.getVariantImage());
        variant.setIsActive(request.getIsActive());

        productVariantRepository.save(variant);
        return productVariantMapper.toResponse(variant);
    }

}

