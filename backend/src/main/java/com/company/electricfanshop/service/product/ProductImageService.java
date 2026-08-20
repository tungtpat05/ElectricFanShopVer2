package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.ProductImageCreateRequest;
import com.company.electricfanshop.dto.product.request.ProductImageUpdateRequest;
import com.company.electricfanshop.dto.product.response.ProductImageResponse;
import com.company.electricfanshop.entity.product.Product;
import com.company.electricfanshop.entity.product.ProductImage;
import com.company.electricfanshop.exception.DuplicateResourceException;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.mapper.product.ProductImageMapper;
import com.company.electricfanshop.repository.product.ProductImageRepository;
import com.company.electricfanshop.repository.product.ProductRepository;
import com.company.electricfanshop.service.storage.ImageStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductImageService {
    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;
    private final ProductImageMapper productImageMapper;
    private final ImageStorageService imageStorageService;

    public List<ProductImageResponse> getAll(Integer productId) {
        List<ProductImage> images = productImageRepository.findByProductIdOrderByDisplayOrder(productId);
        return images.stream().map(productImageMapper::toResponse).toList();
    }

    public ProductImageResponse getById(Integer productId, Integer imageId) {
        ProductImage image = productImageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException("ProductImage", "id", imageId));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));
        return productImageMapper.toResponse(image);
    }

    public ProductImageResponse create(Integer productId, ProductImageCreateRequest request) {
        if(productImageRepository.existsByImageUrl(request.getImageUrl())) {
            throw new DuplicateResourceException("ProductImage", "imageUrl", request.getImageUrl());
        }

        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));

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
                .orElseThrow(() -> new ResourceNotFoundException("ProductImage", "id", imageId));

        if (!image.getProduct().getId().equals(productId)) {
            throw new ResourceNotFoundException("ProductImage", "id", imageId);
        }

        String oldPublicId = image.getImagePublicId();
        String newPublicId = request.getImagePublicId();

        if (oldPublicId != null && !oldPublicId.isEmpty() && (newPublicId == null || !oldPublicId.equals(newPublicId))) {
            imageStorageService.delete(oldPublicId);
        }

        if (request.getImageUrl() != null && !request.getImageUrl().isBlank()) {
            image.setImageUrl(request.getImageUrl());
        }
        if (request.getImagePublicId() != null) {
            image.setImagePublicId(request.getImagePublicId());
        }
        if (request.getDisplayOrder() != null) {
            image.setDisplayOrder(request.getDisplayOrder());
        }
        productImageRepository.save(image);

        return productImageMapper.toResponse(image);
    }

    public void delete(Integer productId, Integer imageId) {
        ProductImage image = productImageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException("ProductImage", "id", imageId));

        if (!image.getProduct().getId().equals(productId)) {
            throw new ResourceNotFoundException("ProductImage", "id", imageId);
        }

        String publicId = image.getImagePublicId();
        if (publicId != null && !publicId.isEmpty()) {
            imageStorageService.delete(publicId);
        }

        productImageRepository.delete(image);
    }

    public List<ProductImageResponse> updateDisplayOrders(Integer productId, List<Integer> imageIdsOrdered) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));

        for (int i = 0; i < imageIdsOrdered.size(); i++) {
            Integer imageId = imageIdsOrdered.get(i);
            ProductImage image = productImageRepository.findById(imageId)
                    .orElse(null);
            if (image != null && image.getProduct().getId().equals(productId)) {
                image.setDisplayOrder(i + 1);
                productImageRepository.save(image);
            }
        }

        return getAll(productId);
    }
}

