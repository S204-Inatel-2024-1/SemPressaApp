package com.sempressa.backend.domain.phases;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PhasesDTO {
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Boolean isActive;
}
