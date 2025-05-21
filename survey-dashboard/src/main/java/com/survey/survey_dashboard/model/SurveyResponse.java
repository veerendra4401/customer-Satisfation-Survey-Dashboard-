package com.survey.survey_dashboard.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "survey_responses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SurveyResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(nullable = false)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id", nullable = false)
    private Survey survey;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @NotNull(message = "Satisfaction rating is required")
    @Column(nullable = false)
    private Integer satisfaction;

    @NotNull(message = "Usability rating is required")
    @Column(nullable = false)
    private Integer usability;

    @NotNull(message = "Performance rating is required")
    @Column(nullable = false)
    private Integer performance;

    @NotNull(message = "Value for money rating is required")
    @Column(name = "value_for_money", nullable = false)
    private Integer valueForMoney;

    @NotNull(message = "Recommendation rating is required")
    @Column(nullable = false)
    private Integer recommendations;

    @Column(columnDefinition = "TEXT")
    private String comments;

    @Column(name = "submission_date", nullable = false)
    private LocalDateTime submissionDate;

    @PrePersist
    protected void onCreate() {
        submissionDate = LocalDateTime.now();
    }
} 