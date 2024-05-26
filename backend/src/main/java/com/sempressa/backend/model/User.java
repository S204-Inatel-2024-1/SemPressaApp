package com.sempressa.backend.model;

import com.sempressa.backend.domain.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @Column(unique = true)
    @NotNull
    private String email;

    @NotNull
    private String password;

    @NotNull
    private Integer registration;

    @NotNull
    private UserRole role;

    private String photoUrl;

    @ManyToOne
    @JoinColumn(name = "course")
    private Course course;

    @ManyToMany
    @JoinTable(name = "user_parallel",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "parallel_id"))
    private List<Parallel> parallel = new ArrayList<>();


}