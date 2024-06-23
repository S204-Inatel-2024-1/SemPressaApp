package com.sempressa.backend.domain.team;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Set;

@Data
public class TeamDTO {
    @NotBlank(message = "Não inserido o nome do Projeto")
    private String name;
    private String status = "Classificado";
    private String disqualifiedPhase;
    @NotNull(message = "Linkar projeto com time")
    private Long projectId;
    private Set<Long> usersIds;
}
