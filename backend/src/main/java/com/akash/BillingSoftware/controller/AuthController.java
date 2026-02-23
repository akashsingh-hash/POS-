package com.akash.BillingSoftware.controller;

import com.akash.BillingSoftware.io.AuthRequest;
import com.akash.BillingSoftware.io.AuthResponse;
import com.akash.BillingSoftware.service.UserService;
import com.akash.BillingSoftware.service.impl.AppUserDetailsService;
import com.akash.BillingSoftware.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;


@RestController
@RequiredArgsConstructor
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService appUserDetailsService;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @PostMapping("/encode")
    public String encodePassword(@RequestBody Map<String,String> request){
        return passwordEncoder.encode(request.get("password"));
    }

    @PostMapping("/login")
//    @RequestBody tells Spring to deserialize JSON request body into a Java object (AuthRequest).
    public AuthResponse login(@RequestBody AuthRequest request) throws Exception{
//        Calls your private authenticate method to verify the credentials.
//        If invalid, it will throw an exception and return an error to the client.
        authenticate(request.getEmail(),request.getPassword());
//        After authentication, you fetch user details from your AppUserDetailsService.
        final UserDetails userDetails = appUserDetailsService.loadUserByUsername(request.getEmail());
//      Because Spring Security’s AuthenticationManager only validates credentials but does not return JWT,
//      you need the full UserDetails for JWT generation.
//        UserDetails contains:
        //email/password/roles
        //Calls a JWT utility class to generate a JWT token using userDetails.
        final String jwtToken = jwtUtil.generateToken(userDetails);
//        request can fetch the role from UserService
        String role = userService.getUserRole(request.getEmail());
        return new AuthResponse(request.getEmail(),jwtToken,role);
    }


    private void authenticate(String email,String password) throws Exception{
        try{
//            AuthenticationManager is a Spring Security component that checks credentials.
//            UsernamePasswordAuthenticationToken is a standard token used for email/username + password authentication.
//            Spring Security will internally call your AppUserDetailsService.loadUserByUsername()
//                 to fetch user details and validate the password.
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
        }
        catch(DisabledException e){
            throw new Exception("User disabled");
        }
        catch (BadCredentialsException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Email or password is incorrect");
        }
    }
}

//JWT
//Stateless token used for authorization in future requests.
//Avoids storing session on server.
//Can be validated in each request using a JWT filter.

//Flow Summary
//User sends POST /login with email & password.
//authenticate() uses AuthenticationManager:
//Calls your AppUserDetailsService.loadUserByUsername(email) internally.
//Validates password.
//If successful:
//UserDetails is fetched.
//JWT token is generated using jwtUtil.
//Role is fetched.
//Returns AuthResponse with email, token, role.