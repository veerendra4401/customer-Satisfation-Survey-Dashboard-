package com.survey.survey_dashboard.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SurveyDto {
    private Long id;
    
    @NotBlank(message = "Survey name is required")
    private String name;
    
    private String description;
    
    @NotBlank(message = "Category is required")
    private String category;
    
    private boolean active;
    private int questionCount;
    private int responseCount;
    private LocalDateTime createdDate;
    private LocalDateTime lastModified;
} 