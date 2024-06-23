package com.sempressa.backend.service;

import com.sempressa.backend.domain.phases.Phases;
import com.sempressa.backend.domain.phases.PhasesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhasesService {

    @Autowired
    private PhasesRepository phasesRepository;

    public List<Phases> findAll() {
        return phasesRepository.findAll();
    }

    public Optional<Phases> findById(Long id) {
        return phasesRepository.findById(id);
    }

    public Phases save(Phases phases) {
        return phasesRepository.save(phases);
    }

    public void deleteById(Long id) {
        phasesRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return phasesRepository.existsById(id);
    }
}
