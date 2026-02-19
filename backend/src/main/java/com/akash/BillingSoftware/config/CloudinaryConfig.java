package com.akash.BillingSoftware.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils; // ✅ Must be Cloudinary's ObjectUtils
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration // Marks this class as a Spring config class
public class CloudinaryConfig {

    // Inject credentials from application.properties
    @Value("${cloudinary.cloud-name}")
    private String cloudName;
    @Value("${cloudinary.api-key}")
    private String apiKey;
    @Value("${cloudinary.api-secret}")
    private String apiSecret;

    @Bean // Expose a Cloudinary bean to the Spring context
    public Cloudinary cloudinary() {
        // ObjectUtils.asMap converts key-value pairs to a Map<String,Object>
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }
}
