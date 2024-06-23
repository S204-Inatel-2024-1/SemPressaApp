package com.sempressa.backend.domain.parallel;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ParallelDTO {

    private Long id;

    @NotNull(message = "Name must not be null")
    private String name;

    @NotNull(message = "Description must not be null")
    private String description;
}
