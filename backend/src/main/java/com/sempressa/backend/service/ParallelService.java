package com.sempressa.backend.service;

import com.sempressa.backend.domain.parallel.Parallel;
import com.sempressa.backend.domain.parallel.ParallelDTO;
import com.sempressa.backend.domain.parallel.ParallelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ParallelService {

    @Autowired
    private ParallelRepository parallelRepository;

    public Page<Parallel> findAll(Pageable pageable) {
        return parallelRepository.findAll(pageable);
    }

    public Optional<ParallelDTO> findById(Long id) {
        return parallelRepository.findById(id)
                .map(Parallel::toDTO);
    }

    public ParallelDTO save(ParallelDTO parallelDTO) {
        Parallel parallel = Parallel.fromDTO(parallelDTO);
        Parallel savedParallel = parallelRepository.save(parallel);
        return savedParallel.toDTO();
    }

    public Optional<ParallelDTO> update(Long id, ParallelDTO parallelDTO) {
        return parallelRepository.findById(id)
                .map(existingParallel -> {
                    existingParallel.updateFromDTO(parallelDTO);
                    return parallelRepository.save(existingParallel).toDTO();
                });
    }

    public void deleteById(Long id) {
        parallelRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return parallelRepository.existsById(id);
    }
}
