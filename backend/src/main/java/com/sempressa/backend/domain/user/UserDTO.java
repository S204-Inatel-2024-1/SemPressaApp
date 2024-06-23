package com.sempressa.backend.domain.user;

import lombok.Data;

@Data
public class UserDTO {

    private Long id;
    private String name;
    private String email;
    private Integer registration;
    private UserRole role;
    private String photoUrl;
}
