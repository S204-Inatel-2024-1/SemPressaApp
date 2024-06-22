package com.sempressa.backend.domain.user.dto;

import com.sempressa.backend.domain.user.UserRole;
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
