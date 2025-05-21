package com.survey.survey_dashboard.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Product name is required")
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    private String description;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "last_modified")
    private LocalDateTime lastModified;

    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
        lastModified = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        lastModified = LocalDateTime.now();
    }
} 