package com.sempressa.backend.model;

import com.sempressa.backend.dto.ParallelDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name = "parallel")
@Getter
@Setter
public class Parallel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String description;

    // Convert entity to DTO
    public ParallelDTO toDTO() {
        ParallelDTO dto = new ParallelDTO();
        dto.setId(this.id);
        dto.setName(this.name);
        dto.setDescription(this.description);
        return dto;
    }

    // Update entity from DTO
    public void updateFromDTO(ParallelDTO dto) {
        this.name = dto.getName();
        this.description = dto.getDescription();
    }

    // Create entity from DTO
    public static Parallel fromDTO(ParallelDTO dto) {
        Parallel parallel = new Parallel();
        parallel.updateFromDTO(dto);
        return parallel;
    }
}
