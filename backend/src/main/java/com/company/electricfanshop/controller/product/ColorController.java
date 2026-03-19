package com.company.electricfanshop.controller.product;

import com.company.electricfanshop.dto.product.request.ColorCreateRequest;
import com.company.electricfanshop.dto.product.request.ColorUpdateRequest;
import com.company.electricfanshop.dto.product.response.ColorResponse;
import com.company.electricfanshop.service.product.ColorService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/colors")
public class ColorController {
    private final ColorService colorService;

    @GetMapping
    public ResponseEntity<List<ColorResponse>> getAll() {
        List<ColorResponse> colors = colorService.getAll();
        return ResponseEntity.ok(colors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ColorResponse> getById(@PathVariable Integer id) {
        ColorResponse response = colorService.getById(id);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ColorResponse> create(@RequestBody ColorCreateRequest request) {
        ColorResponse response = colorService.create(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ColorResponse> update(@PathVariable Integer id, @RequestBody ColorUpdateRequest request) {
        ColorResponse response = colorService.update(id, request);
        return ResponseEntity.ok(response);
    }
}
