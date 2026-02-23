package com.akash.BillingSoftware.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserResponse {
    private String userID;
    private String name;
    private String email;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String role;
}
