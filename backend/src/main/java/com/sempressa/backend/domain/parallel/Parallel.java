package com.sempressa.backend.domain.parallel;

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

    public ParallelDTO toDTO() {
        ParallelDTO dto = new ParallelDTO();
        dto.setId(this.id);
        dto.setName(this.name);
        dto.setDescription(this.description);
        return dto;
    }

    public static Parallel fromDTO(ParallelDTO dto) {
        Parallel parallel = new Parallel();
        parallel.setId(dto.getId());
        parallel.setName(dto.getName());
        parallel.setDescription(dto.getDescription());
        return parallel;
    }

    public void updateFromDTO(ParallelDTO dto) {
        this.setName(dto.getName());
        this.setDescription(dto.getDescription());
    }
}
