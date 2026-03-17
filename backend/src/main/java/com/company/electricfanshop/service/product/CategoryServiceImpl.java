package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.CategoryCreateRequest;
import com.company.electricfanshop.dto.product.request.CategoryUpdateRequest;
import com.company.electricfanshop.dto.product.response.BrandResponse;
import com.company.electricfanshop.dto.product.response.CategoryResponse;
import com.company.electricfanshop.entity.product.Brand;
import com.company.electricfanshop.entity.product.Category;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.mapper.product.BrandMapper;
import com.company.electricfanshop.mapper.product.CategoryMapper;
import com.company.electricfanshop.repository.product.BrandRepository;
import com.company.electricfanshop.repository.product.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;
    private CategoryMapper categoryMapper;

    @Override
    public List<CategoryResponse> getAll() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(category -> categoryMapper.toResponse(category)).toList();
    }

    @Override
    public CategoryResponse getById(Integer id) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category == null) {
            return null;
        } else {
            return categoryMapper.toResponse(category);
        }
    }

    @Override
    public CategoryResponse create(CategoryCreateRequest request) {
        Category category = categoryMapper.toEntity(request);
        categoryRepository.save(category);
        return categoryMapper.toResponse(category);
    }

    @Override
    public CategoryResponse update(Integer id, CategoryUpdateRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));

        category.setCategoryName(request.getCategoryName());
        category.setSlug(request.getSlug());
        category.setCategoryImage(request.getCategoryImage());
        category.setDescription(request.getDescription());

        categoryRepository.save(category);
        return categoryMapper.toResponse(category);
    }

}
