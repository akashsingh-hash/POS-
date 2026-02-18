package com.akash.BillingSoftware.service;

import com.akash.BillingSoftware.io.CategoryRequest;
import com.akash.BillingSoftware.io.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse addCategory(CategoryRequest request);

    List<CategoryResponse> readCategories();

    void deleteCategory(String categoryId);
}
