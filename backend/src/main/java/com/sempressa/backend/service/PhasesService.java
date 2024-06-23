package com.sempressa.backend.service;

import com.sempressa.backend.domain.phases.Phases;
import com.sempressa.backend.domain.phases.PhasesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
        updateIsActive(phases);
        return phasesRepository.save(phases);
    }

    public void deleteById(Long id) {
        phasesRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return phasesRepository.existsById(id);
    }

    private void updateIsActive(Phases phases) {
        // Obter a data atual em formato string
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String currentDateStr = LocalDate.now().format(formatter);

        // Verificar se a data atual está entre startDate e endDate
        if (phases.getStartDate().compareTo(currentDateStr) <= 0 && phases.getEndDate().compareTo(currentDateStr) >= 0) {
            phases.setIsActive(true);
        } else {
            phases.setIsActive(false);

            // Se não estiver ativo, verificar se há alguma próxima fase para ativar
            Optional<Phases> nextPhase = phasesRepository.findAll().stream()
                    .filter(p -> p.getId() > phases.getId() && p.getStartDate().compareTo(currentDateStr) > 0)
                    .findFirst();

            nextPhase.ifPresent(p -> p.setIsActive(true));
        }
    }
}
