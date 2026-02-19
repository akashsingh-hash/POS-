package com.akash.BillingSoftware.service;

import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

public interface FileUploadService {
    Map<String, String> uploadFile(MultipartFile file);  // returns url + publicId
    boolean deleteFile(String publicId);                 // delete using publicId
}
