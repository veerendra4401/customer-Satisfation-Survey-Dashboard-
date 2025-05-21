package com.survey.survey_dashboard.controller;

import com.survey.survey_dashboard.dto.CategoryBreakdownDto;
import com.survey.survey_dashboard.dto.DashboardStatsDto;
import com.survey.survey_dashboard.dto.ProductStatsDto;
import com.survey.survey_dashboard.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    @Autowired
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDto> getDashboardStats(
            @RequestParam(value = "productId", required = false, defaultValue = "all") String productId,
            @RequestParam(value = "dateRange", required = false, defaultValue = "all") String dateRange,
            @RequestParam(value = "category", required = false, defaultValue = "all") String category) {
        
        DashboardStatsDto stats = dashboardService.getDashboardStats(productId, dateRange, category);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductStatsDto>> getProductBreakdown(
            @RequestParam(value = "dateRange", required = false, defaultValue = "all") String dateRange,
            @RequestParam(value = "category", required = false, defaultValue = "all") String category) {
        
        List<ProductStatsDto> productStats = dashboardService.getProductBreakdown(dateRange, category);
        return ResponseEntity.ok(productStats);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryBreakdownDto>> getCategoryBreakdown(
            @RequestParam(value = "productId", required = false, defaultValue = "all") String productId,
            @RequestParam(value = "dateRange", required = false, defaultValue = "all") String dateRange) {
        
        List<CategoryBreakdownDto> categoryStats = dashboardService.getCategoryBreakdown(productId, dateRange);
        return ResponseEntity.ok(categoryStats);
    }
} 