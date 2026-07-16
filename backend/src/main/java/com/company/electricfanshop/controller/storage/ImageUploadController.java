package com.company.electricfanshop.controller.storage;

import com.company.electricfanshop.dto.common.ImageUploadResult;
import com.company.electricfanshop.service.storage.ImageStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/images")
@RequiredArgsConstructor
public class ImageUploadController {

    private final ImageStorageService imageStorageService;

    // @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/upload")
    public ResponseEntity<ImageUploadResult> uploadImage(@RequestParam("file") MultipartFile file) {
        ImageUploadResult result = imageStorageService.upload(file);
        return ResponseEntity.ok(result);
    }
}
