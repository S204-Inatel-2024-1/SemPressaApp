package com.sempressa.backend.domain.phases;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "phases")
public class Phases {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Boolean isActive = false; // Inicialmente definido como false

    @NotNull
    @Column(name = "start_date")
    private String startDate;

    @NotNull
    @Column(name = "end_date")
    private String endDate;

    @NotNull
    @Column(name = "deliveries")
    private String deliveries; // Assuming deliveries are a comma-separated list

    // Getters and setters
    // Omitted for brevity, but you should include them in your actual code
}
