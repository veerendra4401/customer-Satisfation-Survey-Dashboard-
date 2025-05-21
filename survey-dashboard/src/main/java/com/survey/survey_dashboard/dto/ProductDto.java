package com.survey.survey_dashboard.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    
    @NotBlank(message = "Product name is required")
    private String name;
    
    @NotBlank(message = "Category is required")
    private String category;
    
    private String description;
    private boolean active;
    private LocalDateTime createdDate;
    private LocalDateTime lastModified;
} 