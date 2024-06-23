package com.sempressa.backend.service;

import com.sempressa.backend.domain.project.Project;
import com.sempressa.backend.domain.project.ProjectRepository;
import com.sempressa.backend.domain.team.Team;
import com.sempressa.backend.domain.team.TeamDTO;
import com.sempressa.backend.domain.team.TeamRepository;
import com.sempressa.backend.domain.team.TeamUpdateDTO;
import com.sempressa.backend.domain.user.User;
import com.sempressa.backend.domain.user.UserRepository;
import com.sempressa.backend.infra.exceptions.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Transactional
    public Team createTeam(TeamDTO teamDTO) {

        Project project = projectRepository.findById(teamDTO.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Projeto não achado"));

        List<User> users = new ArrayList<>();
        for (Long userId : teamDTO.getUsersIds()) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
            users.add(user);
        }

        Team team = new Team(teamDTO, project, users);
        return teamRepository.save(team);
    }

    public Object getAllTeams() {
        return teamRepository.findAll();
    }

    @Transactional
    public Team  updateTeam(TeamUpdateDTO updateDTO, Long id) {
         Optional<Team> teamOptional = teamRepository.findById(id);

        if (teamOptional.isEmpty()) {
            throw new RuntimeException("Team not found");
        }

        Team team = teamOptional.get();
        List<User> users = userRepository.findAllById(updateDTO.getUsersIds());
        Optional<Project> project = projectRepository.findById(updateDTO.getProjectId());


        team.updateTeam(updateDTO, project.get(), users);

        return teamRepository.save(team);
    }
}
