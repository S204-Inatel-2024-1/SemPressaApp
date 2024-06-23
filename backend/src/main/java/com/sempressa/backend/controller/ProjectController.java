package com.sempressa.backend.controller;

import com.sempressa.backend.domain.project.Project;
import com.sempressa.backend.domain.project.ProjectDTO;
import com.sempressa.backend.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("project")
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody @Valid ProjectDTO projectDTO, UriComponentsBuilder uriBuilder) {
        Project project = projectService.createProject(projectDTO);
        var uri = uriBuilder.path("/project/{id}").buildAndExpand(project.getId()).toUri();
        return ResponseEntity.created(uri).body(project);
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {}
}
