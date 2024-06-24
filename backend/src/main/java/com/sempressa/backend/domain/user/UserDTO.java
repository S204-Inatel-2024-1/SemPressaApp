package com.sempressa.backend.domain.user;

import lombok.Data;
import com.sempressa.backend.domain.team.Team;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import java.util.Set;

@Data
public class UserDTO {

    private Long id;
    private String name;
    private String email;
    private Integer registration;
    private UserRole role;
    private String photoUrl;

    @NotBlank(message = "Nome de usuario vazio")
    private String name;

    @NotBlank
    private String password;

    @NotBlank(message = "email vazio")
    @Email(message = "Email inválido")
    @Pattern(regexp = "^[\\w.%+-]+@\\w+inatel\\.br$", message = "Email deve terminar com inatel.br")
    private String email;

    @NotBlank(message = "Matricula vazia")
    private Integer registration;

    @NotNull
    private String role = UserRole.STUDENT.name();
    private String photoUrl;

    private Set<Team> teamIds;
}
