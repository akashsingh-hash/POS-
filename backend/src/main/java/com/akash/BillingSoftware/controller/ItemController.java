package com.akash.BillingSoftware.controller;

import com.akash.BillingSoftware.io.ItemRequest;
import com.akash.BillingSoftware.io.ItemResponse;
import com.akash.BillingSoftware.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

//   only admin can add Item
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/admin/items")
    public ItemResponse addItem(@RequestPart("item") String item,
                                @RequestPart("file")MultipartFile file) {
        ObjectMapper mapper = new ObjectMapper();
        try{
            ItemRequest request = mapper.readValue(item,ItemRequest.class);
            return itemService.addItem(request,file);
        }
        catch (Exception e){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid category JSON"
            );
        }
    }

//     can be accessed by users also
    @GetMapping("/items")
    public List<ItemResponse> fetchItem(){
        return itemService.fetchItems();
    }

//     admin can remove item
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/admin/items/{itemId}")
    public void removeItem(@PathVariable String itemId){
        try{
            itemService.deleteItem(itemId);
        }
        catch(Exception e){
            throw  new ResponseStatusException(HttpStatus.NOT_FOUND,"Item not Found");
        }
    }

}
