package com.survey.survey_dashboard.service;

import com.survey.survey_dashboard.dto.CategoryBreakdownDto;
import com.survey.survey_dashboard.dto.DashboardStatsDto;
import com.survey.survey_dashboard.dto.ProductStatsDto;

import java.util.List;

public interface DashboardService {
    DashboardStatsDto getDashboardStats(String productId, String dateRange, String category);
    List<ProductStatsDto> getProductBreakdown(String dateRange, String category);
    List<CategoryBreakdownDto> getCategoryBreakdown(String productId, String dateRange);
} 