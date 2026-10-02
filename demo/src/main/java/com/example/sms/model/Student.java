package com.example.sms.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "students")
public class Student {
    @Getter
    @Setter
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @NotBlank
    private String name;
    @Email
    @NotBlank @Column(unique = true) private String email;
    @Setter
    private LocalDate dateOfBirth;
    @Setter
    @Getter
    private String major;

    public Student() {
    }

    public Student(Long id, String name, LocalDate dateOfBirth, String major) {
        this.id = id;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.major = major;
    }

    public Object getName() {
        return name;
    }

    public Object getEmail() {
        return email;
    }

    public Object getDateOfBirth() {
        return dateOfBirth;
    }

    public void setEmail(Object email) {
        this.email = (String)email;
    }

}
