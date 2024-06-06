package com.sempressa.backend.dto;

import com.sempressa.backend.utils.domain.enums.UserRole;
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
