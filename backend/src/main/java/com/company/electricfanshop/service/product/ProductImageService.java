package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.ProductImageCreateRequest;
import com.company.electricfanshop.dto.product.request.ProductImageUpdateRequest;
import com.company.electricfanshop.dto.product.response.ProductImageResponse;
import com.company.electricfanshop.entity.product.Product;
import com.company.electricfanshop.entity.product.ProductImage;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.mapper.product.ProductImageMapper;
import com.company.electricfanshop.repository.product.ProductImageRepository;
import com.company.electricfanshop.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductImageService {
    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;
    private final ProductImageMapper productImageMapper;

    public List<ProductImageResponse> getAll(Integer productId) {
        List<ProductImage> images = productImageRepository.findByProductIdOrderByDisplayOrder(productId);
        return images.stream().map(productImageMapper::toResponse).toList();
    }

    public ProductImageResponse getById(Integer productId, Integer imageId) {
        ProductImage image = productImageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException(imageId));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(productId));
        return productImageMapper.toResponse(image);
    }

    public ProductImageResponse create(Integer productId, ProductImageCreateRequest request) {
        if(productImageRepository.existsByImageUrl(request.getImageUrl())) {
            throw new ResourceNotFoundException(request.getImageUrl());
        }

        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException(productId));

        ProductImage image = productImageMapper.toEntity(request);

        Integer maxOrder = productImageRepository
                .findMaxDisplayOrderByProductId(productId);
        int nextOrder = (maxOrder == null) ? 1 : maxOrder + 1;
        image.setDisplayOrder(nextOrder);

        image.setProduct(product);
        productImageRepository.save(image);

        // Add image to product's image list
        product.getImages().add(image);

        return productImageMapper.toResponse(image);
    }

    public ProductImageResponse update(Integer productId, Integer imageId, ProductImageUpdateRequest request) {

        ProductImage image = productImageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException(imageId));

        if (!image.getProduct().getId().equals(productId)) {
            throw new ResourceNotFoundException(imageId);
        }

        image.setImageUrl(request.getImageUrl());
        productImageRepository.save(image);

        return productImageMapper.toResponse(image);
    }
}

