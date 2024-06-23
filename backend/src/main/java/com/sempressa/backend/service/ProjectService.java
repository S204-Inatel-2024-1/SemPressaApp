package com.sempressa.backend.service;

import com.sempressa.backend.domain.project.Project;
import com.sempressa.backend.domain.project.ProjectDTO;
import com.sempressa.backend.domain.project.ProjectRepository;
import com.sempressa.backend.domain.project.UpdateProjectDTO;
import com.sempressa.backend.domain.team.Team;
import com.sempressa.backend.domain.team.TeamRepository;
import com.sempressa.backend.domain.team.TeamUpdateDTO;
import com.sempressa.backend.domain.user.User;
import com.sempressa.backend.infra.exceptions.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    TeamRepository teamRepository;

    @Transactional
    public Project createProject(ProjectDTO projectDTO) {
        Team team = null;
        if (projectDTO.getTeamId() != null) {
            team = teamRepository.findById(projectDTO.getTeamId())
                .orElseThrow(() -> new ResourceNotFoundException("Projeto não achado"));
        }

        Project project = new Project(projectDTO);
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return projects;

    }

    @Transactional
    public Project updateProject(UpdateProjectDTO projectDTO, Long id) {
        Optional<Project> projectOptional = projectRepository.findById(id);

        if (projectOptional.isEmpty()) {
            throw new RuntimeException("Project não encontrado");
        }

        Project project = projectOptional.get();

        return project.updateProject(projectDTO);

    }
}
