package com.company.electricfanshop.service.product;

import com.company.electricfanshop.dto.product.request.SpecDefinitionCreateRequest;
import com.company.electricfanshop.dto.product.request.SpecDefinitionOptionCreateRequest;
import com.company.electricfanshop.dto.product.request.SpecDefinitionUpdateRequest;
import com.company.electricfanshop.dto.product.response.SpecDefinitionOptionResponse;
import com.company.electricfanshop.dto.product.response.SpecDefinitionResponse;
import com.company.electricfanshop.entity.product.Category;
import com.company.electricfanshop.entity.product.SpecDefinition;
import com.company.electricfanshop.entity.product.SpecDefinitionOption;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.mapper.product.SpecDefinitionMapper;
import com.company.electricfanshop.repository.product.CategoryRepository;
import com.company.electricfanshop.repository.product.SpecDefinitionOptionRepository;
import com.company.electricfanshop.repository.product.SpecDefinitionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecDefinitionService {
    private final SpecDefinitionRepository specDefinitionRepository;
    private final SpecDefinitionOptionRepository specDefinitionOptionRepository;
    private final CategoryRepository categoryRepository;
    private final SpecDefinitionMapper specDefinitionMapper;

    public List<SpecDefinitionResponse> getAllByCategory(Integer categoryId, boolean activeOnly) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException(categoryId);
        }
        List<SpecDefinition> list = activeOnly
                ? specDefinitionRepository.findByCategoryIdAndIsActiveTrueOrderByDisplayOrderAsc(categoryId)
                : specDefinitionRepository.findByCategoryIdOrderByDisplayOrderAsc(categoryId);
        return list.stream().map(specDefinitionMapper::toResponse).toList();
    }

    public SpecDefinitionResponse getById(Integer categoryId, Integer id) {
        SpecDefinition entity = specDefinitionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        if (!entity.getCategory().getId().equals(categoryId)) {
            throw new ResourceNotFoundException(id);
        }
        return specDefinitionMapper.toResponse(entity);
    }

    @Transactional
    public SpecDefinitionResponse create(Integer categoryId, SpecDefinitionCreateRequest request) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException(categoryId));

        if (specDefinitionRepository.existsByCategoryIdAndKeyCode(categoryId, request.getKeyCode())) {
            throw new IllegalArgumentException("Key code '" + request.getKeyCode() + "' already exists in this category");
        }

        SpecDefinition entity = specDefinitionMapper.toEntity(request);
        entity.setCategory(category);
        specDefinitionRepository.save(entity);

        return specDefinitionMapper.toResponse(entity);
    }

    @Transactional
    public SpecDefinitionResponse update(Integer categoryId, Integer id, SpecDefinitionUpdateRequest request) {
        SpecDefinition entity = specDefinitionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));

        if (!entity.getCategory().getId().equals(categoryId)) {
            throw new ResourceNotFoundException(id);
        }

        boolean keyCodeChanged = !entity.getKeyCode().equals(request.getKeyCode());
        if (keyCodeChanged && specDefinitionRepository.existsByCategoryIdAndKeyCode(categoryId, request.getKeyCode())) {
            throw new IllegalArgumentException("Key code '" + request.getKeyCode() + "' already exists in this category");
        }

        specDefinitionMapper.updateEntityFromRequest(request, entity);
        specDefinitionRepository.save(entity);

        return specDefinitionMapper.toResponse(entity);
    }

    @Transactional
    public void delete(Integer categoryId, Integer id) {
        SpecDefinition entity = specDefinitionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));

        if (!entity.getCategory().getId().equals(categoryId)) {
            throw new ResourceNotFoundException(id);
        }

        specDefinitionRepository.delete(entity);
    }

    // Option Management
    public List<SpecDefinitionOptionResponse> getOptions(Integer categoryId, Integer specDefinitionId) {
        getById(categoryId, specDefinitionId); // validate existence
        List<SpecDefinitionOption> options = specDefinitionOptionRepository.findBySpecDefinitionIdOrderByDisplayOrderAsc(specDefinitionId);
        return options.stream().map(specDefinitionMapper::optionToResponse).toList();
    }

    @Transactional
    public SpecDefinitionOptionResponse addOption(Integer categoryId, Integer specDefinitionId, SpecDefinitionOptionCreateRequest request) {
        SpecDefinition specDefinition = specDefinitionRepository.findById(specDefinitionId)
                .orElseThrow(() -> new ResourceNotFoundException(specDefinitionId));

        if (!specDefinition.getCategory().getId().equals(categoryId)) {
            throw new ResourceNotFoundException(specDefinitionId);
        }

        SpecDefinitionOption option = specDefinitionMapper.optionToEntity(request);
        option.setSpecDefinition(specDefinition);
        specDefinitionOptionRepository.save(option);

        return specDefinitionMapper.optionToResponse(option);
    }

    @Transactional
    public SpecDefinitionOptionResponse updateOption(Integer categoryId, Integer specDefinitionId, Integer optionId, SpecDefinitionOptionCreateRequest request) {
        SpecDefinitionOption option = specDefinitionOptionRepository.findById(optionId)
                .orElseThrow(() -> new ResourceNotFoundException(optionId));

        if (!option.getSpecDefinition().getId().equals(specDefinitionId) ||
            !option.getSpecDefinition().getCategory().getId().equals(categoryId)) {
            throw new ResourceNotFoundException(optionId);
        }

        option.setOptionValue(request.getOptionValue());
        if (request.getDisplayOrder() != null) {
            option.setDisplayOrder(request.getDisplayOrder());
        }
        specDefinitionOptionRepository.save(option);

        return specDefinitionMapper.optionToResponse(option);
    }

    @Transactional
    public void deleteOption(Integer categoryId, Integer specDefinitionId, Integer optionId) {
        SpecDefinitionOption option = specDefinitionOptionRepository.findById(optionId)
                .orElseThrow(() -> new ResourceNotFoundException(optionId));

        if (!option.getSpecDefinition().getId().equals(specDefinitionId) ||
            !option.getSpecDefinition().getCategory().getId().equals(categoryId)) {
            throw new ResourceNotFoundException(optionId);
        }

        specDefinitionOptionRepository.delete(option);
    }
}
