package com.akash.BillingSoftware.service.impl;

import com.akash.BillingSoftware.service.FileUploadService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileUploadServiceImpl implements FileUploadService {

    private final String uploadDir = "src/main/resources/static/images/";

    @Override
    public String uploadFile(MultipartFile file) {
        try {
            if (file == null || file.isEmpty()) {
                throw new RuntimeException("File is empty");
            }

            String originalName = file.getOriginalFilename();
            if (originalName == null || !originalName.contains(".")) {
                throw new RuntimeException("Invalid file name");
            }

            String extension = originalName.substring(originalName.lastIndexOf(".") + 1);
            String fileName = UUID.randomUUID() + "." + extension;

            Path filePath = Paths.get(uploadDir, fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            return "/images/" + fileName;

        } catch (Exception e) {
            throw new RuntimeException("File upload failed");
        }
    }

    @Override
    public boolean deleteFile(String imgUrl) {
        try {
            if (imgUrl == null || imgUrl.isBlank()) {
                return false;
            }

            String fileName = Paths.get(imgUrl).getFileName().toString();
            Path filePath = Paths.get(uploadDir, fileName);

            return Files.deleteIfExists(filePath);

        } catch (IOException e) {
            throw new RuntimeException("File deletion failed");
        }
    }
}
