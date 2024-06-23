package com.sempressa.backend.controller;

import com.sempressa.backend.domain.project.Project;
import com.sempressa.backend.domain.project.ProjectDTO;
import com.sempressa.backend.domain.project.ProjectRepository;
import com.sempressa.backend.domain.project.UpdateProjectDTO;
import com.sempressa.backend.domain.team.Team;
import com.sempressa.backend.domain.team.TeamRepository;
import com.sempressa.backend.domain.team.TeamUpdateDTO;
import com.sempressa.backend.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("project")
public class ProjectController {

    @Autowired
    ProjectService projectService;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private TeamRepository teamRepository;

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody @Valid ProjectDTO projectDTO, UriComponentsBuilder uriBuilder) {
        Project project = projectService.createProject(projectDTO);
        var uri = uriBuilder.path("/project/{id}").buildAndExpand(project.getId()).toUri();
        return ResponseEntity.created(uri).body(project);
    }


    @GetMapping
    public ResponseEntity<Page<Project>> getAllProjects(@PageableDefault(size = 10, sort = {"name"}) Pageable pageable) {
        var page = projectRepository.findAll(pageable);

        return ResponseEntity.ok(page);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable Long id) {
        var project = projectRepository.findById(id);
        return project.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity updateProject(@RequestBody @Valid UpdateProjectDTO projectDTO, @PathVariable Long id){
        Project project = projectService.updateProject(projectDTO, id);

        return ResponseEntity.ok(project);
    }

    @DeleteMapping
    public ResponseEntity deleteTeam(@PathVariable Long id){
        teamRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteProject(@PathVariable Long id){
        projectRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
