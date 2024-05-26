package com.sempressa.backend.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/logout")
public class LogoutController {

    public String Logout()
    {
        return "loginng out";
    }
}
