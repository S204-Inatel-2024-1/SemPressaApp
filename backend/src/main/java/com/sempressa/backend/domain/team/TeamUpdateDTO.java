package com.sempressa.backend.domain.team;


import lombok.Data;

import java.util.Set;

@Data
public class TeamUpdateDTO {
    private String status;
    private String disqualifiedPhase;
    private Long projectId;
    private Set<Long> usersIds;
}
