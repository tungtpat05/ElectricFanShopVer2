package com.company.electricfanshop.controller.product;

import com.company.electricfanshop.dto.product.request.*;
import com.company.electricfanshop.dto.product.response.*;
import com.company.electricfanshop.service.product.CategoryService;
import com.company.electricfanshop.service.product.SpecDefinitionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;
    private final SpecDefinitionService specDefinitionService;

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        List<CategoryResponse> list = categoryService.getAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getById(@PathVariable Integer id) {
        CategoryResponse response = categoryService.getById(id);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<CategoryResponse> create(@RequestBody @Valid CategoryCreateRequest request) {
        CategoryResponse response = categoryService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> update(@PathVariable Integer id,
            @RequestBody @Valid CategoryUpdateRequest request) {
        CategoryResponse response = categoryService.update(id, request);
        return ResponseEntity.ok(response);
    }

    // Spec Definition Endpoints
    @GetMapping("/{categoryId}/spec-definitions")
    public ResponseEntity<List<SpecDefinitionResponse>> getSpecDefinitions(
            @PathVariable Integer categoryId,
            @RequestParam(defaultValue = "false") boolean activeOnly) {
        List<SpecDefinitionResponse> list = specDefinitionService.getAllByCategory(categoryId, activeOnly);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{categoryId}/spec-definitions/{id}")
    public ResponseEntity<SpecDefinitionResponse> getSpecDefinitionById(
            @PathVariable Integer categoryId,
            @PathVariable Integer id) {
        SpecDefinitionResponse response = specDefinitionService.getById(categoryId, id);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{categoryId}/spec-definitions")
    public ResponseEntity<SpecDefinitionResponse> createSpecDefinition(
            @PathVariable Integer categoryId,
            @RequestBody @Valid SpecDefinitionCreateRequest request) {
        SpecDefinitionResponse response = specDefinitionService.create(categoryId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{categoryId}/spec-definitions/{id}")
    public ResponseEntity<SpecDefinitionResponse> updateSpecDefinition(
            @PathVariable Integer categoryId,
            @PathVariable Integer id,
            @RequestBody @Valid SpecDefinitionUpdateRequest request) {
        SpecDefinitionResponse response = specDefinitionService.update(categoryId, id, request);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{categoryId}/spec-definitions/{id}")
    public ResponseEntity<Void> deleteSpecDefinition(
            @PathVariable Integer categoryId,
            @PathVariable Integer id) {
        specDefinitionService.delete(categoryId, id);
        return ResponseEntity.noContent().build();
    }

    // Spec Definition Option Endpoints
    @GetMapping("/{categoryId}/spec-definitions/{specDefId}/options")
    public ResponseEntity<List<SpecDefinitionOptionResponse>> getSpecDefinitionOptions(
            @PathVariable Integer categoryId,
            @PathVariable Integer specDefId) {
        List<SpecDefinitionOptionResponse> list = specDefinitionService.getOptions(categoryId, specDefId);
        return ResponseEntity.ok(list);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{categoryId}/spec-definitions/{specDefId}/options")
    public ResponseEntity<SpecDefinitionOptionResponse> createSpecDefinitionOption(
            @PathVariable Integer categoryId,
            @PathVariable Integer specDefId,
            @RequestBody @Valid SpecDefinitionOptionCreateRequest request) {
        SpecDefinitionOptionResponse response = specDefinitionService.addOption(categoryId, specDefId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{categoryId}/spec-definitions/{specDefId}/options/{optionId}")
    public ResponseEntity<SpecDefinitionOptionResponse> updateSpecDefinitionOption(
            @PathVariable Integer categoryId,
            @PathVariable Integer specDefId,
            @PathVariable Integer optionId,
            @RequestBody @Valid SpecDefinitionOptionCreateRequest request) {
        SpecDefinitionOptionResponse response = specDefinitionService.updateOption(categoryId, specDefId, optionId,
                request);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{categoryId}/spec-definitions/{specDefId}/options/{optionId}")
    public ResponseEntity<Void> deleteSpecDefinitionOption(
            @PathVariable Integer categoryId,
            @PathVariable Integer specDefId,
            @PathVariable Integer optionId) {
        specDefinitionService.deleteOption(categoryId, specDefId, optionId);
        return ResponseEntity.noContent().build();
    }
}
