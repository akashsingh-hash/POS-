package com.akash.BillingSoftware.service.impl;


import com.akash.BillingSoftware.entity.CategoryEntity;
import com.akash.BillingSoftware.entity.ItemEntity;
import com.akash.BillingSoftware.io.ItemRequest;
import com.akash.BillingSoftware.repo.CategoryRepository;
import com.akash.BillingSoftware.repo.ItemRepository;
import com.akash.BillingSoftware.io.ItemResponse;
import com.akash.BillingSoftware.repo.ItemRepository;
import com.akash.BillingSoftware.service.FileUploadService;
import com.akash.BillingSoftware.service.ItemService;
import io.jsonwebtoken.lang.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final FileUploadService fileUploadService;
    private final CategoryRepository categoryRepository;

    @Override
    public ItemResponse addItem(ItemRequest request, MultipartFile file) {
        Map<String,String> res = fileUploadService.uploadFile(file);
        ItemEntity entity = convertToEntity(request);
        CategoryEntity category = categoryRepository.findByCategoryId(request.getCategoryId()).
                orElseThrow(() -> new RuntimeException("Category Not Found" + request.getCategoryId()));
        entity.setCategoryEntity(category);
        entity.setImgUrl(res.get("url"));
        entity.setImgPublicId(res.get("publicId"));
        entity = itemRepository.save(entity);
        return convertToResponse(entity);
    }



    @Override
    public List<ItemResponse> fetchItems() {
        return itemRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItem(String itemId) {
//         delete the image and remove the item
        ItemEntity entity = itemRepository.findByItemId(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found " + itemId));
        if (entity.getImgPublicId() != null && !entity.getImgPublicId().isBlank()) {
            fileUploadService.deleteFile(entity.getImgPublicId());
        }
        itemRepository.delete(entity);
    }


    private ItemResponse convertToResponse(ItemEntity entity){
        return ItemResponse.builder()
                .itemId(entity.getItemId())
                .name(entity.getName())
                .price(entity.getPrice())
                .categoryId(entity.getCategoryEntity().getCategoryId())
                .description(entity.getDescription())
                .categoryName(entity.getCategoryEntity().getName())
                .imgUrl(entity.getImgUrl())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .imgPublicId(entity.getImgPublicId())
                .build();
    }
    private ItemEntity convertToEntity(ItemRequest request) {
        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .build();
    }
}
