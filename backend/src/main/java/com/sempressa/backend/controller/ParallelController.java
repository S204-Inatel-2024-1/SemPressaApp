package com.sempressa.backend.controller;

import com.sempressa.backend.domain.parallel.Parallel;
import com.sempressa.backend.domain.parallel.ParallelDTO;
import com.sempressa.backend.service.ParallelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
    public ResponseEntity<Page<Parallel>> getAllParallels(@PageableDefault(size = 10, sort = {"name"}) Pageable pageable) {
        var page = parallelService.findAll(pageable);

        return ResponseEntity.ok(page);
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
