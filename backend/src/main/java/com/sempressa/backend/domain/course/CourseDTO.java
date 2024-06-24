package com.sempressa.backend.domain.course;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CourseDTO {

    private Long id;

    @NotNull(message = "Name must not be null")
    private String name;

    @NotNull(message = "Slug must not be null")
    private String slug;
}
