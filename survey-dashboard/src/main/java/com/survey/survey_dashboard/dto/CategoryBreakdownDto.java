package com.survey.survey_dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryBreakdownDto {
    private String category;
    private double satisfactionAvg;
    private double usabilityAvg;
    private double performanceAvg;
    private double valueForMoneyAvg;
    private double recommendationsAvg;
    private long responseCount;
} 