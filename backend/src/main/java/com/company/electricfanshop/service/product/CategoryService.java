package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.CategoryCreateRequest;
import com.company.electricfanshop.dto.product.request.CategoryUpdateRequest;
import com.company.electricfanshop.dto.product.response.CategoryResponse;
import com.company.electricfanshop.entity.product.Category;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.mapper.product.CategoryMapper;
import com.company.electricfanshop.repository.product.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryResponse> getAll() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(categoryMapper::toResponse).toList();
    }

    public CategoryResponse getById(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return categoryMapper.toResponse(category);
    }

    public CategoryResponse create(CategoryCreateRequest request) {
        if(categoryRepository.existsByCategoryName(request.getCategoryName())) {
            throw new ResourceNotFoundException(request.getCategoryName());
        }
        Category category = categoryMapper.toEntity(request);
        categoryRepository.save(category);
        return categoryMapper.toResponse(category);
    }

    public CategoryResponse update(Integer id, CategoryUpdateRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));

        category.setCategoryName(request.getCategoryName());
        category.setSlug(request.getSlug());
        category.setCategoryImage(request.getCategoryImage());
        category.setDescription(request.getDescription());
        category.setIsActive(request.getIsActive());

        categoryRepository.save(category);
        return categoryMapper.toResponse(category);
    }

    public Category getEntityById(Integer id) {
        return categoryRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException(id));
    }
}
