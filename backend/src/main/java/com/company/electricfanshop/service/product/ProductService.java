package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.ProductCreateRequest;
import com.company.electricfanshop.dto.product.request.ProductUpdateRequest;
import com.company.electricfanshop.dto.product.response.ProductResponse;
import com.company.electricfanshop.entity.product.Brand;
import com.company.electricfanshop.entity.product.Category;
import com.company.electricfanshop.entity.product.Product;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.mapper.product.ProductMapper;
import com.company.electricfanshop.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final BrandService brandService;
    private final CategoryService categoryService;
    private final ProductMapper productMapper;

    public List<ProductResponse> getAll() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(productMapper::toResponse).toList();
    }

    public ProductResponse getById(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return productMapper.toResponse(product);
    }

    public List<ProductResponse> getByCategoryId(Integer categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
        return products.stream().map(productMapper::toResponse).toList();
    }

    public ProductResponse create(ProductCreateRequest request) {
        Product product = productMapper.toEntity(request);

        // Set brand if provided
        if (request.getBrandId() != null) {
            Brand brand = brandService.getEntityById(request.getBrandId());
            product.setBrand(brand);
        }

        // Set brand if provided
        if (request.getCategoryId() != null) {
            Category category = categoryService.getEntityById(request.getCategoryId());
            product.setCategory(category);
        }

        productRepository.save(product);
        return productMapper.toResponse(product);
    }

    public ProductResponse update(Integer id, ProductUpdateRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));

        productMapper.updateEntityFromRequest(request, product);

        // Update brand if provided
        if (request.getBrandId() != null) {
            Brand brand = brandService.getEntityById(request.getBrandId());
            product.setBrand(brand);
        }

        // Update category if provided
        if (request.getCategoryId() != null) {
            Category category = categoryService.getEntityById(request.getCategoryId());
            product.setCategory(category);
        }

        productRepository.save(product);
        return productMapper.toResponse(product);
    }

}
