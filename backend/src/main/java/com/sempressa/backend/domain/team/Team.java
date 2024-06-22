package com.sempressa.backend.domain.team;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sempressa.backend.domain.project.Project;
import com.sempressa.backend.domain.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@Data
@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "project_id")
    private Project project;


    @ManyToMany
    @JoinTable(
            name = "teams_users",
            joinColumns = @JoinColumn(name = "teams_id"),
            inverseJoinColumns = @JoinColumn(name = "users_id")
    )
    @JsonIgnoreProperties("teams")
    private List<User> users = new ArrayList<>();

    private String name;

    private String status;

    @Column(name = "disqualified_phase")
    private String disqualifiedPhase;

    public Team(TeamDTO dados, Project project, List<User> users) {
        this.name = dados.getName();
        this.status = dados.getStatus();
        this.disqualifiedPhase = dados.getDisqualifiedPhase();
        this.project = project;
        this.users = users;
    }
}
