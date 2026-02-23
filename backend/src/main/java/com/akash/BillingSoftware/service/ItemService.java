package com.akash.BillingSoftware.service;

import com.akash.BillingSoftware.io.ItemRequest;
import com.akash.BillingSoftware.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {
    ItemResponse addItem(ItemRequest request, MultipartFile file);
    List<ItemResponse> fetchItems();
    void deleteItem(String itemId);
}
