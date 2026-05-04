package com.bookstore.onlinebookstore.controller;

import com.bookstore.onlinebookstore.dto.LoginRequest;
import com.bookstore.onlinebookstore.dto.SignupRequest;
import com.bookstore.onlinebookstore.model.User;
import com.bookstore.onlinebookstore.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request) {
        return authService.signup(request);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}