package com.sempressa.backend.domain.user;

import com.sempressa.backend.domain.parallel.Parallel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParallelRepository extends JpaRepository<Parallel, Long> {


}