package com.sempressa.backend.controller;

import com.sempressa.backend.domain.user.dto.ParallelDTO;
import com.sempressa.backend.domain.parallel.Parallel;
import com.sempressa.backend.domain.user.ParallelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/parallels")
public class ParallelController {

    @Autowired
    private ParallelRepository parallelRepo;

    @GetMapping("/{id}")
    public ResponseEntity<ParallelDTO> getParallelByID(@PathVariable Long id) {
        Optional<Parallel> parallelData = parallelRepo.findById(id);

        if (parallelData.isPresent()) {
            ParallelDTO parallelDTO = parallelData.get().toDTO();
            return new ResponseEntity<>(parallelDTO, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<ParallelDTO>> getAllParallels() {
        try {
            List<Parallel> parallelsList = parallelRepo.findAll();

            if (parallelsList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            List<ParallelDTO> parallelDTOList = parallelsList.stream()
                    .map(Parallel::toDTO)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(parallelDTOList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<ParallelDTO> addParallel(@RequestBody ParallelDTO parallelDTO) {
        Parallel parallel = Parallel.fromDTO(parallelDTO);
        Parallel savedParallel = parallelRepo.save(parallel);
        return new ResponseEntity<>(savedParallel.toDTO(), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParallelDTO> updateParallelByID(@PathVariable Long id, @RequestBody ParallelDTO newParallelDTO) {
        Optional<Parallel> oldParallelData = parallelRepo.findById(id);

        if (oldParallelData.isPresent()) {
            Parallel updatedParallel = oldParallelData.get();
            updatedParallel.updateFromDTO(newParallelDTO);
            Parallel savedParallel = parallelRepo.save(updatedParallel);
            return new ResponseEntity<>(savedParallel.toDTO(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParallelByID(@PathVariable Long id) {
        if (parallelRepo.existsById(id)) {
            parallelRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
