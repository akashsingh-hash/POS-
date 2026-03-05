package com.akash.BillingSoftware.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ItemResponse {
    private String itemId;
    private  String name;
    private BigDecimal price;
    private String categoryId;
    private String description;
    private String categoryName;
    private String imgUrl;
    private String imgPublicId;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
