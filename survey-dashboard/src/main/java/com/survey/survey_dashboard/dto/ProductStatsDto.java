package com.survey.survey_dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductStatsDto {
    private Long productId;
    private String product;
    private long count;
    private double satisfaction;
    private double usability;
    private double performance;
    private double valueForMoney;
    private double recommendations;
} 