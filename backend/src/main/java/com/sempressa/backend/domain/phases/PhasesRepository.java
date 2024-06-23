package com.sempressa.backend.domain.phases;

import com.sempressa.backend.domain.phases.Phases;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhasesRepository extends JpaRepository<Phases, Long> {
}
