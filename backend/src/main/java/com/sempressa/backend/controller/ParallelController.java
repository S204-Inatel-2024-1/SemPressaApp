package com.sempressa.backend.controller;

import com.sempressa.backend.domain.parallel.ParallelDTO;
import com.sempressa.backend.service.ParallelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/parallel")
public class ParallelController {

    @Autowired
    private ParallelService parallelService;

    @GetMapping("/{id}")
    public ResponseEntity<ParallelDTO> getParallelById(@PathVariable Long id) {
        return parallelService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<ParallelDTO> getAllParallels() {
        return parallelService.findAll();
    }

    @PostMapping
    public ResponseEntity<ParallelDTO> createParallel(@Validated @RequestBody ParallelDTO parallelDTO) {
        ParallelDTO savedParallelDTO = parallelService.save(parallelDTO);
        return ResponseEntity.ok(savedParallelDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParallelDTO> updateParallel(@PathVariable Long id, @Validated @RequestBody ParallelDTO parallelDTO) {
        return parallelService.update(id, parallelDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParallel(@PathVariable Long id) {
        if (!parallelService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        parallelService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
