package com.sempressa.backend.controller;

import com.sempressa.backend.domain.team.Team;
import com.sempressa.backend.domain.team.TeamDTO;
import com.sempressa.backend.domain.team.TeamRepository;
import com.sempressa.backend.domain.user.User;
import com.sempressa.backend.domain.user.UserRepository;
import com.sempressa.backend.service.TeamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("team")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TeamRepository teamRepository;

    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody @Valid TeamDTO teamDTO, UriComponentsBuilder uriBuilder) {
        Team team = teamService.createTeam(teamDTO);


        var uri = uriBuilder.path("/team/{id}").buildAndExpand(team.getId()).toUri();
        return ResponseEntity.created(uri).body(team);
    }

    @GetMapping
    public List<Team> getAllTeams() {
        List<Team> team = teamRepository.findAll();
        return team;
    }


}
