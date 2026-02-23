package com.akash.BillingSoftware.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret.key}")
    private String secret;

//    This will store the cryptographic key used to:
//    Sign tokens   Verify tokens
    private SecretKey secretKey;

    // 🔐 Initialize secure key (must be 256+ bits)
//    Used to run a method after Spring initializes the bean.
    @PostConstruct
    public void init() {
//        Converts your string secret into a secure HMAC SHA key
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // 🔹 Generate Token
    public String generateToken(UserDetails userDetails) {
//        Create empty claims map
        Map<String, Object> claims = new HashMap<>();
//        🔹 Claims
//          Represents the payload of a JWT (the data stored inside it).
//        🔹 Keys
//        Used to generate secure cryptographic keys.
//        Pass claims + username (subject) to createToken
        return createToken(claims, userDetails.getUsername());
    }

    // 🔹 Create Token
    private String createToken(Map<String, Object> claims, String subject) {
//        Claims = payload && subject = Username (email)
//        we could put claims.put("role", "ADMIN");
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
//                This is VERY IMPORTANT
//                It:
//                Hashes the header + payload
//                Creates signature using HMAC SHA
                .signWith(secretKey)
                .compact();
    }

    // 🔹 Extract Username
    public String extractUsername(String token) {
//        Uses method reference: equivalalent to  claims -> claims.getSubject()
        return extractClaim(token, Claims::getSubject);
    }

    // 🔹 Extract Expiration
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // 🔹 Generic Claim Extractor
//    extractClaim(token, Claims::getSubject);
//    extractClaim(token, Claims::getExpiration);
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // 🔹 Extract All Claims
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
//    What is happening?
//Create parser
//Verify signature using secretKey
//Parse token
//Return payload
//⚠️ If signature invalid → exception thrown.
//This is what makes JWT secure.

    // 🔹 Check Expiration
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // 🔹 Validate Token
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
}

//   🔥 Full Authentication Flow With This Class
//User logs in
//AuthenticationManager validates credentials
//JwtUtil.generateToken() creates JWT
//Token sent to frontend
//Frontend sends token in header:
//Authorization: Bearer eyJhbGc...
//JWT filter:
//Extracts token
//Calls validateToken()
//If valid → sets authentication in SecurityContext