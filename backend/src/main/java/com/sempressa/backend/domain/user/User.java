package com.sempressa.backend.domain.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sempressa.backend.domain.course.Course;
import com.sempressa.backend.domain.parallel.Parallel;
import com.sempressa.backend.domain.team.Team;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
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
    private String role;

    private String photoUrl;

    @ManyToOne
    private Course course;


    @ManyToMany(mappedBy = "users", cascade = {CascadeType.ALL})
    @JsonIgnoreProperties("users")
    private List<Team> teams = new ArrayList<>();

//    @ManyToMany
//    @JoinTable(name = "user_parallel", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "parallel_id"))
//    private List<Parallel> parallel = new ArrayList<>();


}
