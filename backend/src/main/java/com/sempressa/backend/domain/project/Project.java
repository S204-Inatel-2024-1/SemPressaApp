package com.sempressa.backend.domain.project;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sempressa.backend.domain.team.Team;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name= "projects")
@Data
@NoArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;


    public Project(ProjectDTO projectDTO){
        this.description = projectDTO.getDescription();
        this.name = projectDTO.getName();
//        if(team != null){
//            this.team = team;
//        }
    }
}
