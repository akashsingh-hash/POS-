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

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final FileUploadService fileService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestPart("category") String categoryString,
                                        @RequestPart("file") MultipartFile file) {
        // Logic to add a new category
        // This is just a placeholder response, you would replace it with actual logic
        ObjectMapper objectMapper = new ObjectMapper();
        try{
            CategoryRequest categoryRequest = objectMapper.readValue(categoryString,CategoryRequest.class);
            return categoryService.addCategory(categoryRequest,file);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Exception occured while parsing in the json");
        }

    }

    @GetMapping
    public List<CategoryResponse> fetchCategories(){
        return categoryService.readCategories();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{categoryId}")
    public void delete(@PathVariable String categoryId){
        try{
            categoryService.deleteCategory(categoryId);
        }
        catch(Exception e){
            throw new ResponseStatusException
                    (HttpStatus.NOT_FOUND,"Category Not Found: "
                            + categoryId);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileUrl = fileService.uploadFile(file);
        return ResponseEntity.ok(fileUrl);
    }

}
