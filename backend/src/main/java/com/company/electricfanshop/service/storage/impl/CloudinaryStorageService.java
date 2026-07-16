package com.company.electricfanshop.service.storage.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.company.electricfanshop.dto.common.ImageUploadResult;
import com.company.electricfanshop.exception.StorageException;
import com.company.electricfanshop.service.storage.ImageStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryStorageService implements ImageStorageService {

    private final Cloudinary cloudinary;

    @Override
    public ImageUploadResult upload(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new StorageException("File is empty or null");
        }
        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String url = (String) uploadResult.get("secure_url");
            String publicId = (String) uploadResult.get("public_id");
            return new ImageUploadResult(url, publicId);
        } catch (IOException e) {
            throw new StorageException("Failed to upload file to Cloudinary", e);
        }
    }

    @Override
    public void delete(String publicId) {
        if (publicId == null || publicId.isEmpty()) {
            return;
        }
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new StorageException("Failed to delete file from Cloudinary: " + publicId, e);
        }
    }
}
