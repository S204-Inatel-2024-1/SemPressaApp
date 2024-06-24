package com.sempressa.backend.domain.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sempressa.backend.domain.course.Course;
import com.sempressa.backend.domain.parallel.Parallel;
import com.sempressa.backend.domain.team.Team;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Data
@Entity
@Table(name = "users")
public class User implements UserDetails {

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

//    @ManyToMany
//    @JoinTable(name = "user_parallel", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "parallel_id"))
//    private List<Parallel> parallel = new ArrayList<>();

    @NotNull
    private String role;

    private String photoUrl;

    @ManyToOne
    private Course course;


    @ManyToMany(mappedBy = "users", cascade = {CascadeType.ALL})
    @JsonIgnoreProperties("users")
    private List<Team> teams = new ArrayList<>();

    //Controle de Role
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
