package com.sempressa.backend.domain.project;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProjectDTO {

    @NotBlank(message = "Nome de Projeto vazio! Insira um nome")
    private String name;

    @NotBlank(message = "Descrição do Projeto vazia! Insira uma descrição")
    private String description;

    private Long teamId;
}
