package com.akash.BillingSoftware.controller;

import com.akash.BillingSoftware.io.CategoryRequest;
import com.akash.BillingSoftware.io.CategoryResponse;
import com.akash.BillingSoftware.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestBody CategoryRequest categoryRequest) {
        // Logic to add a new category
        // This is just a placeholder response, you would replace it with actual logic
        return categoryService.addCategory(categoryRequest);
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
}
