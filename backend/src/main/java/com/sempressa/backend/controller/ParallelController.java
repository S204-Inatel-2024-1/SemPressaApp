package com.sempressa.backend.controller;

import com.sempressa.backend.model.Parallel;
import com.sempressa.backend.repository.ParallelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/parallels")  // URL base para todos os métodos do controlador
public class ParallelController {

    @Autowired
    private ParallelRepository parallelRepo;

    @GetMapping("/{id}")
    public ResponseEntity<Parallel> getParallelByID(@PathVariable Long id){
        Optional<Parallel> parallelData = parallelRepo.findById(id);

        if(parallelData.isPresent()){
            return new ResponseEntity<>(parallelData.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<Parallel>> getAllParallels(){
        try {
            List<Parallel> parallelsList = new ArrayList<>();
            parallelRepo.findAll().forEach(parallelsList::add);

            if (parallelsList.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(parallelsList, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<Parallel> addParallel(@RequestBody Parallel parallel){
        Parallel parallelObj = parallelRepo.save(parallel);

        return new ResponseEntity<>(parallelObj, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Parallel> updateParallelByID(@PathVariable Long id, @RequestBody Parallel newParallelData){
        Optional<Parallel> oldParallelData = parallelRepo.findById(id);

        if (oldParallelData.isPresent()){
            Parallel updatedParallelData = oldParallelData.get();
            updatedParallelData.setName(newParallelData.getName());
            updatedParallelData.setDescription(newParallelData.getDescription());

            parallelRepo.save(updatedParallelData);
            return new ResponseEntity<>(updatedParallelData, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParallelByID(@PathVariable Long id){
        parallelRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
