package com.sempressa.backend.domain.team;

import com.sempressa.backend.domain.project.Project;
import com.sempressa.backend.domain.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne()
    private Project project;

    @ManyToMany
    @JoinTable(
        name = "team_usuario",
        joinColumns = @JoinColumn(name = "team_id"),
        inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private Set<User> users = new HashSet<>();

    @NotBlank
    private String name;

    @NotBlank
    private String status;

    private String disqualifiedPhase;
}
