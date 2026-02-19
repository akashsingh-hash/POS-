package com.akash.BillingSoftware.service.impl;

import com.akash.BillingSoftware.entity.CategoryEntity;
import com.akash.BillingSoftware.io.CategoryRequest;
import com.akash.BillingSoftware.io.CategoryResponse;
import com.akash.BillingSoftware.repo.CategoryRepository;
import com.akash.BillingSoftware.service.CategoryService;
import com.akash.BillingSoftware.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final FileUploadService fileUploadService;

    // Add new category
    @Override
    public CategoryResponse addCategory(CategoryRequest request, MultipartFile file) {
        Map<String, String> uploadResult = fileUploadService.uploadFile(file);

        CategoryEntity newCategory = convertToEntity(request);
        newCategory.setImgUrl(uploadResult.get("url"));
        newCategory.setImgPublicId(uploadResult.get("publicId"));

        CategoryEntity savedCategory = categoryRepository.save(newCategory);
        return convertToResponse(savedCategory);
    }

    // Read all categories
    @Override
    public List<CategoryResponse> readCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // Delete category
    @Override
    public void deleteCategory(String categoryId) {
        CategoryEntity entity = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new RuntimeException("Category Not Found : " + categoryId));

        // Delete image from Cloudinary
        if (entity.getImgPublicId() != null && !entity.getImgPublicId().isBlank()) {
            fileUploadService.deleteFile(entity.getImgPublicId());
        }

        categoryRepository.delete(entity);
    }

    // Convert request DTO → entity
    private CategoryEntity convertToEntity(CategoryRequest request) {
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .build();
    }

    // Convert entity → response DTO
    private CategoryResponse convertToResponse(CategoryEntity entity) {
        return CategoryResponse.builder()
                .categoryId(entity.getCategoryId())
                .name(entity.getName())
                .description(entity.getDescription())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .imgUrl(entity.getImgUrl())
                .build();
    }
}
