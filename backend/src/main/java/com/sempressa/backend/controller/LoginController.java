package com.sempressa.backend.controller;

import com.sempressa.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping(path = "api/v1/login")
    public String login(@RequestParam String email, @RequestParam String password){
        boolean isValidUser = userService.validateUser(email, password);
        if (isValidUser) {
            return "Login successful";
        } else {
            return "Invalid email or password";
        }
    }
}