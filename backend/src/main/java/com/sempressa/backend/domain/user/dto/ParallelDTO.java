package com.sempressa.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ParallelDTO {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String description;
}
