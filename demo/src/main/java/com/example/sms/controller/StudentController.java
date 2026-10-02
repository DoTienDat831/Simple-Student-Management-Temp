package com.example.sms.controller;

import com.example.sms.model.Student;
import com.example.sms.repository.StudentRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentRepository repo;
    public StudentController(StudentRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Student> all(@RequestParam(required = false) String search) {
        return (search == null || search.isBlank())
                ? repo.findAll()
                : repo.findByNameContainingIgnoreCase(search);
    }

    @GetMapping("/{id}")
    public Student one(@PathVariable Long id) {
        return repo.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student create(@Valid @RequestBody Student s) { return repo.save(s); }

    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @Valid @RequestBody Student s) {
        Student existing = one(id);
        existing.setName((String) s.getName());
        existing.setEmail(s.getEmail());
        existing.setDateOfBirth((LocalDate) s.getDateOfBirth());
        existing.setMajor(s.getMajor());
        return repo.save(existing);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { repo.deleteById(id); }
}