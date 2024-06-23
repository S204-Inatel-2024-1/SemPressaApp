package com.sempressa.backend.controller;

import com.sempressa.backend.domain.phases.Phases;
import com.sempressa.backend.domain.phases.PhasesDTO;
import com.sempressa.backend.service.PhasesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/phases")
public class PhasesController {

    @Autowired
    private PhasesService phasesService;

    @GetMapping("/{id}")
    public ResponseEntity<PhasesDTO> getPhasesById(@PathVariable Long id) {
        return phasesService.findById(id)
                .map(phases -> ResponseEntity.ok(convertToDto(phases)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<PhasesDTO> getAllPhases() {
        return phasesService.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<PhasesDTO> createPhases(@Validated @RequestBody PhasesDTO phasesDTO) {
        Phases phases = convertToEntity(phasesDTO);
        Phases savedPhases = phasesService.save(phases);
        return ResponseEntity.ok(convertToDto(savedPhases));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhasesDTO> updatePhases(@PathVariable Long id, @Validated @RequestBody PhasesDTO phasesDTO) {
        if (!phasesService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        Phases phases = convertToEntity(phasesDTO);
        phases.setId(id); // Ensure the id is set
        Phases updatedPhases = phasesService.save(phases);
        return ResponseEntity.ok(convertToDto(updatedPhases));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhases(@PathVariable Long id) {
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
        return phasesDTO;
    }

    private Phases convertToEntity(PhasesDTO phasesDTO) {
        Phases phases = new Phases();
        phases.setId(phasesDTO.getId());
        phases.setName(phasesDTO.getName());
        phases.setIsActive(phasesDTO.getIsActive());
        return phases;
    }
}
