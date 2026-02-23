package com.akash.BillingSoftware.service.impl;


import com.akash.BillingSoftware.entity.UserEntity;
import com.akash.BillingSoftware.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)throws UsernameNotFoundException{
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email not found for the email" + email));
        return new User(user.getEmail(),user.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority(user.getRole())));
    }
}

//new User(...) – Spring Security’s User implements UserDetails. It needs:
//Username – user.getEmail() (in your case, email is the login ID)
//Password – user.getPassword() (should be encoded with bcrypt or another encoder)
//Authorities – Collections.singleton(new SimpleGrantedAuthority(user.getRole()))
//Here you are converting your user's role (like "ROLE_ADMIN") into a SimpleGrantedAuthority.
//        Collections.singleton(...) – Creates a single-item immutable set, since User expects a collection of authorities.
//        Why this is important:
//Spring Security uses the UserDetails object to:
//Check password match.
//Check roles/authorities for authorization (like @PreAuthorize).
//Store user info in the SecurityContext.

//How It Works in Spring Security
//User tries to log in with email + password.
//Spring Security calls loadUserByUsername(email).
//Your service fetches the UserEntity from the DB.
//If user exists:
//Returns a UserDetails object with email, password, and roles.
//If user does not exist:
//Throws UsernameNotFoundException.
//Spring Security then:
//Compares the provided password with user.getPassword() (using PasswordEncoder).
//Grants access based on roles in SimpleGrantedAuthority.