package com.survey.survey_dashboard.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "surveys")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Survey name is required")
    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "question_count")
    private int questionCount;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "last_modified")
    private LocalDateTime lastModified;

    @OneToMany(mappedBy = "survey", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SurveyResponse> responses = new ArrayList<>();

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