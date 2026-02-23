package com.akash.BillingSoftware.service.impl;

import com.akash.BillingSoftware.service.FileUploadService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class FileUploadServiceImpl implements FileUploadService {

    private final Cloudinary cloudinary;

    public FileUploadServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public Map<String, String> uploadFile(MultipartFile file) {
        try {
            if (file == null || file.isEmpty()) {
                throw new RuntimeException("File is empty");
            }

            // Upload to Cloudinary
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

            String secureUrl = uploadResult.get("secure_url").toString(); // URL for frontend
            String publicId = uploadResult.get("public_id").toString();   // Needed for delete/update

            Map<String, String> result = new HashMap<>();
            result.put("url", secureUrl);
            result.put("publicId", publicId);

            return result;

        } catch (IOException e) {
            throw new RuntimeException("File upload failed");
        }
    }

    @Override
    public boolean deleteFile(String publicId) {
        try {
            if (publicId == null || publicId.isBlank()) {
                return false;
            }

            Map result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            return "ok".equals(result.get("result"));

        } catch (IOException e) {
            throw new RuntimeException("File deletion failed");
        }
    }
}
