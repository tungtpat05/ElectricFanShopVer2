package com.company.electricfanshop.service.storage;

import com.company.electricfanshop.dto.common.ImageUploadResult;
import org.springframework.web.multipart.MultipartFile;

public interface ImageStorageService {
    ImageUploadResult upload(MultipartFile file);
    void delete(String publicId);
}
