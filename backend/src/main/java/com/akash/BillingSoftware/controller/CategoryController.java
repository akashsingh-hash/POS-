package com.akash.BillingSoftware.controller;

import com.akash.BillingSoftware.io.CategoryRequest;
import com.akash.BillingSoftware.io.CategoryResponse;
import com.akash.BillingSoftware.service.CategoryService;
import com.akash.BillingSoftware.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final FileUploadService fileService;


    @PostMapping(value = "/admin/categories" ,consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(
            @RequestParam("category") String categoryJson,
            @RequestParam("file") MultipartFile file) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            CategoryRequest categoryRequest =
                    objectMapper.readValue(categoryJson, CategoryRequest.class);

            return categoryService.addCategory(categoryRequest, file);

        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid category JSON"
            );
        }
    }



    @GetMapping("/admin/categories")
    public List<CategoryResponse> fetchCategories() {
        return categoryService.readCategories();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/admin/categories/{categoryId}")
    public void delete(@PathVariable String categoryId) {
        try {
            categoryService.deleteCategory(categoryId);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Category Not Found: " + categoryId
            );
        }
    }

    @PostMapping(value = "/upload", consumes = "multipart/form-data") // ✅ Added consumes
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        Map<String, String> res = fileService.uploadFile(file);

        String fileUrl = res.get("url");   // ✅ FIXED KEY (was secure_url)

        return ResponseEntity.ok(fileUrl);
    }
}
