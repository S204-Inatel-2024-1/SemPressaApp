package com.sempressa.backend.controller;

import com.sempressa.backend.domain.team.Team;
import com.sempressa.backend.domain.team.TeamDTO;
import com.sempressa.backend.domain.team.TeamRepository;
import com.sempressa.backend.domain.team.TeamUpdateDTO;
import com.sempressa.backend.domain.user.User;
import com.sempressa.backend.domain.user.UserRepository;
import com.sempressa.backend.service.TeamService;
import jakarta.transaction.Transactional;
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
@RequestMapping("team")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @Autowired
    private TeamRepository teamRepository;

    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody @Valid TeamDTO teamDTO, UriComponentsBuilder uriBuilder) {
        Team team = teamService.createTeam(teamDTO);


        var uri = uriBuilder.path("/team/{id}").buildAndExpand(team.getId()).toUri();
        return ResponseEntity.created(uri).body(team);
    }

    @GetMapping
    public ResponseEntity<Page<Team>> getAllTeams(@PageableDefault(size = 10, sort = {"name"}) Pageable page) {
        var pages =  teamRepository.findAll(page)       ;
        return ResponseEntity.ok(pages);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateTeam(@RequestBody @Valid TeamUpdateDTO teamUpdateDTO, @PathVariable Long id){
        Team team = teamService.updateTeam(teamUpdateDTO, id);

        return ResponseEntity.ok(team);
    }


    @DeleteMapping
    public ResponseEntity deleteTeam(@PathVariable Long id){
        teamRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
