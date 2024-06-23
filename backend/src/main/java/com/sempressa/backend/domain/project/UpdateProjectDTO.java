package com.sempressa.backend.domain.project;

import lombok.Data;

@Data
public class UpdateProjectDTO {
    private String name;
    private String description;
    private Long teamId;
}
