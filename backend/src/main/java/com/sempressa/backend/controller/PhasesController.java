package com.sempressa.backend.controller;

import com.sempressa.backend.domain.phases.Phases;
import com.sempressa.backend.domain.phases.PhasesDTO;
import com.sempressa.backend.service.PhasesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/phases")
public class PhasesController {

    private static final Logger logger = LoggerFactory.getLogger(PhasesController.class);

    @Autowired
    private PhasesService phasesService;

    @GetMapping("/{id}")
    public ResponseEntity<PhasesDTO> getPhasesById(@PathVariable Long id) {
        logger.debug("Fetching phase with id: {}", id);
        return phasesService.findById(id)
                .map(this::convertToDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<PhasesDTO> getAllPhases() {
        logger.debug("Fetching all phases");
        return phasesService.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<PhasesDTO> createPhases(@Validated @RequestBody PhasesDTO phasesDTO) {
        logger.debug("Received phase data for creation: {}", phasesDTO);
        Phases phases = convertToEntity(phasesDTO);
        logger.debug("Converted phase entity: {}", phases);
        Phases savedPhases = phasesService.save(phases);
        logger.debug("Saved phase entity: {}", savedPhases);
        return ResponseEntity.ok(convertToDto(savedPhases));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhasesDTO> updatePhases(@PathVariable Long id, @Validated @RequestBody PhasesDTO phasesDTO) {
        logger.debug("Updating phase with id: {}, data: {}", id, phasesDTO);
        if (!phasesService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        Phases phases = convertToEntity(phasesDTO);
        phases.setId(id); // Ensure the id is set
        Phases updatedPhases = phasesService.save(phases);
        logger.debug("Updated phase entity: {}", updatedPhases);
        return ResponseEntity.ok(convertToDto(updatedPhases));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhases(@PathVariable Long id) {
        logger.debug("Deleting phase with id: {}", id);
        if (!phasesService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        phasesService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private PhasesDTO convertToDto(Phases phases) {
        PhasesDTO phasesDTO = new PhasesDTO();
        phasesDTO.setId(phases.getId());
        phasesDTO.setName(phases.getName());
        phasesDTO.setIsActive(phases.getIsActive());
        phasesDTO.setStartDate(phases.getStartDate());
        phasesDTO.setEndDate(phases.getEndDate());
        phasesDTO.setDeliveries(phases.getDeliveries());
        return phasesDTO;
    }

    private Phases convertToEntity(PhasesDTO phasesDTO) {
        Phases phases = new Phases();
        phases.setId(phasesDTO.getId());
        phases.setName(phasesDTO.getName());
        phases.setIsActive(phasesDTO.getIsActive());
        phases.setStartDate(phasesDTO.getStartDate());
        phases.setEndDate(phasesDTO.getEndDate());
        phases.setDeliveries(phasesDTO.getDeliveries());
        return phases;
    }
}
