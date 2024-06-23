package com.sempressa.backend.domain.phases;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PhasesRepository extends JpaRepository<Phases, Long> {
    // Métodos de consulta personalizados, se necessário
}
