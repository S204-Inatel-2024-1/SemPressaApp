package com.sempressa.backend.domain.project;

import com.sempressa.backend.domain.team.Team;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name= "projects")
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "project")
    private Team team;
}
