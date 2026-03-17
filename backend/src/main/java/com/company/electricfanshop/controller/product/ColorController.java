package com.company.electricfanshop.controller.product;

import com.company.electricfanshop.dto.product.request.ColorCreateRequest;
import com.company.electricfanshop.dto.product.request.ColorUpdateRequest;
import com.company.electricfanshop.dto.product.response.ColorResponse;
import com.company.electricfanshop.service.product.ColorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/colors")
public class ColorController {
    private ColorService colorService;

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

    @PostMapping
    public ResponseEntity<ColorResponse> create(@RequestBody ColorCreateRequest request) {
        ColorResponse response = colorService.create(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ColorResponse> update(@PathVariable Integer id, @RequestBody ColorUpdateRequest request) {
        ColorResponse response = colorService.update(id, request);
        return ResponseEntity.ok(response);
    }
}
