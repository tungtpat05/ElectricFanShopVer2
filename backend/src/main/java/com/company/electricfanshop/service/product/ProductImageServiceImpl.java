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
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductImageServiceImpl implements ProductImageService {
    private ProductImageRepository productImageRepository;
    private ProductRepository productRepository;
    private ProductImageMapper productImageMapper;

    @Override
    public List<ProductImageResponse> getByProductId(Integer productId) {
        List<ProductImage> images = productImageRepository.findByProductIdOrderByDisplayOrder(productId);
        return images.stream().map(image -> productImageMapper.toResponse(image)).toList();
    }

    @Override
    public ProductImageResponse getById(Integer id) {
        ProductImage image = productImageRepository.findById(id).orElse(null);
        if (image == null) {
            return null;
        } else {
            return productImageMapper.toResponse(image);
        }
    }

    @Override
    public ProductImageResponse create(ProductImageCreateRequest request) {
        Product product = productRepository.findById(request.getProductId()).orElse(null);
        if(product == null){
            return null;
        } else {
            ProductImage image = productImageMapper.toEntity(request);
            image.setProduct(product);
            productImageRepository.save(image);

            // Add image to product's image list
            product.getImages().add(image);

            return productImageMapper.toResponse(image);
        }
    }

    @Override
    public ProductImageResponse update(Integer id, ProductImageUpdateRequest request) {
        ProductImage image = productImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));

        image.setImageUrl(request.getImageUrl());
        image.setDisplayOrder(request.getDisplayOrder());

        productImageRepository.save(image);
        return productImageMapper.toResponse(image);
    }
}

