package com.sempressa.backend.service;

import com.sempressa.backend.domain.course.Course;
import com.sempressa.backend.domain.course.CourseDTO;
import com.sempressa.backend.domain.course.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<CourseDTO> findAll() {
        return courseRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<CourseDTO> findById(Long id) {
        return courseRepository.findById(id)
                .map(this::convertToDto);
    }

    public CourseDTO save(CourseDTO courseDTO) {
        Course course = convertToEntity(courseDTO);
        Course savedCourse = courseRepository.save(course);
        return convertToDto(savedCourse);
    }

    public Optional<CourseDTO> update(Long id, CourseDTO courseDTO) {
        return courseRepository.findById(id)
                .map(existingCourse -> {
                    existingCourse.setName(courseDTO.getName());
                    existingCourse.setSlug(courseDTO.getSlug());
                    return convertToDto(courseRepository.save(existingCourse));
                });
    }

    public void deleteById(Long id) {
        courseRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return courseRepository.existsById(id);
    }

    private CourseDTO convertToDto(Course course) {
        CourseDTO courseDTO = new CourseDTO();
        courseDTO.setId(course.getId());
        courseDTO.setName(course.getName());
        courseDTO.setSlug(course.getSlug());
        return courseDTO;
    }

    private Course convertToEntity(CourseDTO courseDTO) {
        Course course = new Course();
        course.setId(courseDTO.getId());
        course.setName(courseDTO.getName());
        course.setSlug(courseDTO.getSlug());
        return course;
    }
}
