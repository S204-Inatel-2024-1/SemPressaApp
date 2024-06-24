package com.sempressa.backend.controller;

import com.sempressa.backend.domain.course.CourseDTO;
import com.sempressa.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable Long id) {
        return courseService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<CourseDTO> getAllCourses() {
        return courseService.findAll();
    }

    @PostMapping
    public ResponseEntity<CourseDTO> createCourse(@Validated @RequestBody CourseDTO courseDTO) {
        CourseDTO savedCourseDTO = courseService.save(courseDTO);
        return ResponseEntity.ok(savedCourseDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseDTO> updateCourse(@PathVariable Long id, @Validated @RequestBody CourseDTO courseDTO) {
        return courseService.update(id, courseDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        if (!courseService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        courseService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
