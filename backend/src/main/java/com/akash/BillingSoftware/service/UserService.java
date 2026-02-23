package com.akash.BillingSoftware.service;

import com.akash.BillingSoftware.io.UserRequest;
import com.akash.BillingSoftware.io.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest request);
    String getUserRole(String email);
    List<UserResponse> readUsers();
    void deleteUser(String id);
}
