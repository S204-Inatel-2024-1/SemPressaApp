package com.sempressa.backend.domain.parallel;

import com.sempressa.backend.domain.parallel.Parallel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParallelRepository extends JpaRepository<Parallel, Long> {
}
