package com.sempressa.backend.domain.course;

import com.sempressa.backend.domain.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String slug;

    @OneToMany(mappedBy = "course", cascade = CascadeType.DETACH)
    private Set<User> userSet = new HashSet<>();
}
