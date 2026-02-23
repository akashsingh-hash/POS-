package com.akash.BillingSoftware.service.impl;

import com.akash.BillingSoftware.entity.UserEntity;
import com.akash.BillingSoftware.io.UserRequest;
import com.akash.BillingSoftware.io.UserResponse;
import com.akash.BillingSoftware.repo.UserRepository;
import com.akash.BillingSoftware.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceIMpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(UserRequest request) {
        UserEntity entity = convertToEntity(request);
//         contains the primary key id now here in this call
        entity = userRepository.save(entity);
        return convertToResponse(entity);
    }

    @Override
    public String getUserRole(String email) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not Found !"));
        return existingUser.getRole();
    }

    @Override
    public List<UserResponse> readUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {
        UserEntity existingUser = userRepository.findByUserId(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not Found !"));
        userRepository.delete(existingUser);
    }

    private UserEntity convertToEntity(UserRequest request){
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole().toUpperCase())
                .name(request.getName())
                .build();
    }

    private UserResponse convertToResponse(UserEntity entity){
        return UserResponse.builder()
                .name(entity.getName())
                .email(entity.getEmail())
                .userID(entity.getUserId())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .role(entity.getRole())
                .build();
    }
}
