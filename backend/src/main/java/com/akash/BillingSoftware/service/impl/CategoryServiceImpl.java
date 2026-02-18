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
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final FileUploadService fileUploadService;

    @Override
    public CategoryResponse addCategory(CategoryRequest request, MultipartFile file) {
        String imgUrl = fileUploadService.uploadFile(file);

        CategoryEntity newCategory = convertToEntity(request);
        newCategory.setImgUrl(imgUrl);

        CategoryEntity savedCategory = categoryRepository.save(newCategory);
        return convertToResponse(savedCategory);
    }


    @Override
    public List<CategoryResponse> readCategories(){
        return categoryRepository.findAll()
                .stream()
                .map(categoryEntity -> convertToResponse(categoryEntity))
                .collect(Collectors.toList());

    }

    @Override
    public void deleteCategory(String categoryId){
        CategoryEntity entity = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new RuntimeException("Category Not Found : " + categoryId));
        fileUploadService.deleteFile(entity.getImgUrl());
        categoryRepository.delete(entity);
    }

    private CategoryEntity convertToEntity(CategoryRequest request) {
        return CategoryEntity.builder()
//                550e8400-e29b-41d4-a716-446655440000
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .build();
    }

    private CategoryResponse convertToResponse(CategoryEntity categoryEntity) {
        return CategoryResponse.builder()
                .categoryId(categoryEntity.getCategoryId())
                .name(categoryEntity.getName())
                .description(categoryEntity.getDescription())
                .createdAt(categoryEntity.getCreatedAt())
                .updatedAt(categoryEntity.getUpdatedAt())
                .imgUrl(categoryEntity.getImgUrl())
                .build();
    }
}
