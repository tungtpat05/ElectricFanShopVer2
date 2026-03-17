package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.ProductCreateRequest;
import com.company.electricfanshop.dto.product.request.ProductUpdateRequest;
import com.company.electricfanshop.dto.product.response.ProductResponse;
import com.company.electricfanshop.entity.product.Product;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.mapper.product.ProductMapper;
import com.company.electricfanshop.repository.product.BrandRepository;
import com.company.electricfanshop.repository.product.CategoryRepository;
import com.company.electricfanshop.repository.product.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;
    private BrandRepository brandRepository;
    private CategoryRepository categoryRepository;
    private ProductMapper productMapper;

    @Override
    public List<ProductResponse> getAll() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(product -> productMapper.toResponse(product)).toList();
    }

    @Override
    public ProductResponse getById(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return productMapper.toResponse(product);
    }

    @Override
    public List<ProductResponse> getByCategoryId(Integer categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
        return products.stream().map(product -> productMapper.toResponse(product)).toList();
    }

    @Override
    public ProductResponse create(ProductCreateRequest request) {
        Product product = productMapper.toEntity(request);

        // Set brand if provided
        if (request.getBrandId() != null) {
            var brand = brandRepository.findById(request.getBrandId())
                    .orElseThrow(() -> new ResourceNotFoundException(request.getBrandId()));
            product.setBrand(brand);
        }

        // Set category
        var category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(request.getCategoryId()));
        product.setCategory(category);

        productRepository.save(product);
        return productMapper.toResponse(product);
    }

    @Override
    public ProductResponse update(Integer id, ProductUpdateRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));

        product.setProductName(request.getProductName());
        product.setSlug(request.getSlug());
        product.setSummary(request.getSummary());
        product.setDescription(request.getDescription());
        product.setBasePrice(request.getBasePrice());
        product.setDiscountPrice(request.getDiscountPrice());
        product.setThumbnail(request.getThumbnail());
        product.setWeightGram(request.getWeightGram());
        product.setLengthCm(request.getLengthCm());
        product.setWidthCm(request.getWidthCm());
        product.setHeightCm(request.getHeightCm());
        product.setIsFeatured(request.getIsFeatured());
        product.setIsActive(request.getIsActive());

        // Update brand if provided
        if (request.getBrandId() != null) {
            var brand = brandRepository.findById(request.getBrandId())
                    .orElseThrow(() -> new ResourceNotFoundException(request.getBrandId()));
            product.setBrand(brand);
        }

        // Update category if provided
        if (request.getCategoryId() != null) {
            var category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException(request.getCategoryId()));
            product.setCategory(category);
        }

        productRepository.save(product);
        return productMapper.toResponse(product);
    }

}
