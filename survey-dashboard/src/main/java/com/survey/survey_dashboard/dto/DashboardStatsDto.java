package com.survey.survey_dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDto {
    private long totalSurveys;
    private long totalResponses;
    private double avgSatisfaction;
    private double responseRate;
    private List<ProductStatsDto> productBreakdown;
} 