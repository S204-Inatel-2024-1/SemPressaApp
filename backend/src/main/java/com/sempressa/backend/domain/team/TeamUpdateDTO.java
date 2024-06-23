package com.sempressa.backend.domain.team;


import java.util.Set;

public class TeamUpdateDTO {
    private String status;
    private String disqualifiedPhase;
    private Long projectId;
    private Set<Long> usersIds;
}
