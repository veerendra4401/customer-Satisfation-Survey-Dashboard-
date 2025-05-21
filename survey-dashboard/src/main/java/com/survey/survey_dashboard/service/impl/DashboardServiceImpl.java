package com.survey.survey_dashboard.service.impl;

import com.survey.survey_dashboard.dto.CategoryBreakdownDto;
import com.survey.survey_dashboard.dto.DashboardStatsDto;
import com.survey.survey_dashboard.dto.ProductStatsDto;
import com.survey.survey_dashboard.model.Product;
import com.survey.survey_dashboard.model.SurveyResponse;
import com.survey.survey_dashboard.repository.ProductRepository;
import com.survey.survey_dashboard.repository.SurveyRepository;
import com.survey.survey_dashboard.repository.SurveyResponseRepository;
import com.survey.survey_dashboard.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final SurveyRepository surveyRepository;
    private final ProductRepository productRepository;
    private final SurveyResponseRepository responseRepository;

    @Autowired
    public DashboardServiceImpl(
            SurveyRepository surveyRepository,
            ProductRepository productRepository,
            SurveyResponseRepository responseRepository) {
        this.surveyRepository = surveyRepository;
        this.productRepository = productRepository;
        this.responseRepository = responseRepository;
    }

    @Override
    public DashboardStatsDto getDashboardStats(String productId, String dateRange, String category) {
        LocalDateTime startDate = getStartDateFromRange(dateRange);
        
        // Get total surveys count
        long totalSurveys = surveyRepository.count();
        
        // Get filtered responses
        List<SurveyResponse> filteredResponses = filterResponses(productId, startDate, category);
        
        // Calculate stats
        long totalResponses = filteredResponses.size();
        double avgSatisfaction = calculateAverageSatisfaction(filteredResponses);
        double responseRate = calculateResponseRate(totalSurveys, totalResponses);
        
        // Get product breakdown
        List<ProductStatsDto> productBreakdown = getProductBreakdown(dateRange, category);
        
        // Create and return the dashboard stats DTO
        return new DashboardStatsDto(
                totalSurveys,
                totalResponses,
                avgSatisfaction,
                responseRate,
                productBreakdown
        );
    }

    @Override
    public List<ProductStatsDto> getProductBreakdown(String dateRange, String category) {
        LocalDateTime startDate = getStartDateFromRange(dateRange);
        List<Product> products;
        
        // Filter products by category if provided
        if (category != null && !category.equals("all")) {
            products = productRepository.findByCategory(category);
        } else {
            products = productRepository.findAll();
        }
        
        // Calculate statistics for each product
        List<ProductStatsDto> productStats = new ArrayList<>();
        
        for (Product product : products) {
            // Get responses for this product within the date range
            List<SurveyResponse> responses = responseRepository.findByProductId(product.getId())
                    .stream()
                    .filter(r -> r.getSubmissionDate().isAfter(startDate))
                    .collect(Collectors.toList());
            
            if (!responses.isEmpty()) {
                double satisfactionAvg = responses.stream()
                        .mapToInt(SurveyResponse::getSatisfaction)
                        .average()
                        .orElse(0.0);
                
                double usabilityAvg = responses.stream()
                        .mapToInt(SurveyResponse::getUsability)
                        .average()
                        .orElse(0.0);
                
                double performanceAvg = responses.stream()
                        .mapToInt(SurveyResponse::getPerformance)
                        .average()
                        .orElse(0.0);
                
                double valueForMoneyAvg = responses.stream()
                        .mapToInt(SurveyResponse::getValueForMoney)
                        .average()
                        .orElse(0.0);
                
                double recommendationsAvg = responses.stream()
                        .mapToInt(SurveyResponse::getRecommendations)
                        .average()
                        .orElse(0.0);
                
                ProductStatsDto stat = new ProductStatsDto(
                        product.getId(),
                        product.getName(),
                        responses.size(),
                        satisfactionAvg,
                        usabilityAvg,
                        performanceAvg,
                        valueForMoneyAvg,
                        recommendationsAvg
                );
                
                productStats.add(stat);
            }
        }
        
        return productStats;
    }

    @Override
    public List<CategoryBreakdownDto> getCategoryBreakdown(String productId, String dateRange) {
        LocalDateTime startDate = getStartDateFromRange(dateRange);
        
        // Get all responses within the date range
        List<SurveyResponse> allResponses = responseRepository.findAll()
                .stream()
                .filter(r -> r.getSubmissionDate().isAfter(startDate))
                .collect(Collectors.toList());
                
        // Filter by product if specified
        if (productId != null && !productId.equals("all")) {
            Long prodId = Long.parseLong(productId);
            allResponses = allResponses.stream()
                    .filter(r -> r.getProduct().getId().equals(prodId))
                    .collect(Collectors.toList());
        }
        
        // Group responses by category
        Map<String, List<SurveyResponse>> responsesByCategory = new HashMap<>();
        
        for (SurveyResponse response : allResponses) {
            String category = response.getProduct().getCategory();
            responsesByCategory.computeIfAbsent(category, k -> new ArrayList<>()).add(response);
        }
        
        // Calculate statistics for each category
        List<CategoryBreakdownDto> categoryStats = new ArrayList<>();
        
        for (Map.Entry<String, List<SurveyResponse>> entry : responsesByCategory.entrySet()) {
            String category = entry.getKey();
            List<SurveyResponse> responses = entry.getValue();
            
            double satisfactionAvg = responses.stream()
                    .mapToInt(SurveyResponse::getSatisfaction)
                    .average()
                    .orElse(0.0);
            
            double usabilityAvg = responses.stream()
                    .mapToInt(SurveyResponse::getUsability)
                    .average()
                    .orElse(0.0);
            
            double performanceAvg = responses.stream()
                    .mapToInt(SurveyResponse::getPerformance)
                    .average()
                    .orElse(0.0);
            
            double valueForMoneyAvg = responses.stream()
                    .mapToInt(SurveyResponse::getValueForMoney)
                    .average()
                    .orElse(0.0);
            
            double recommendationsAvg = responses.stream()
                    .mapToInt(SurveyResponse::getRecommendations)
                    .average()
                    .orElse(0.0);
            
            CategoryBreakdownDto stat = new CategoryBreakdownDto(
                    category,
                    satisfactionAvg,
                    usabilityAvg,
                    performanceAvg,
                    valueForMoneyAvg,
                    recommendationsAvg,
                    responses.size()
            );
            
            categoryStats.add(stat);
        }
        
        return categoryStats;
    }
    
    // Helper methods
    
    private LocalDateTime getStartDateFromRange(String dateRange) {
        LocalDateTime now = LocalDateTime.now();
        
        if (dateRange == null || dateRange.equals("all")) {
            return LocalDateTime.of(2000, 1, 1, 0, 0); // Return a date far in the past
        }
        
        switch (dateRange) {
            case "week":
                return now.minus(1, ChronoUnit.WEEKS);
            case "month":
                return now.minus(1, ChronoUnit.MONTHS);
            case "quarter":
                return now.minus(3, ChronoUnit.MONTHS);
            case "year":
                return now.minus(1, ChronoUnit.YEARS);
            default:
                return LocalDateTime.of(2000, 1, 1, 0, 0); // Default to all time
        }
    }
    
    private List<SurveyResponse> filterResponses(String productId, LocalDateTime startDate, String category) {
        // Get all responses
        List<SurveyResponse> responses = responseRepository.findAll();
        
        // Filter by submission date
        responses = responses.stream()
                .filter(r -> r.getSubmissionDate().isAfter(startDate))
                .collect(Collectors.toList());
        
        // Filter by product if specified
        if (productId != null && !productId.equals("all")) {
            Long prodId = Long.parseLong(productId);
            responses = responses.stream()
                    .filter(r -> r.getProduct().getId().equals(prodId))
                    .collect(Collectors.toList());
        }
        
        // Filter by category if specified
        if (category != null && !category.equals("all")) {
            responses = responses.stream()
                    .filter(r -> r.getProduct().getCategory().equals(category))
                    .collect(Collectors.toList());
        }
        
        return responses;
    }
    
    private double calculateAverageSatisfaction(List<SurveyResponse> responses) {
        if (responses.isEmpty()) {
            return 0.0;
        }
        
        return responses.stream()
                .mapToInt(SurveyResponse::getSatisfaction)
                .average()
                .orElse(0.0);
    }
    
    private double calculateResponseRate(long totalSurveys, long totalResponses) {
        // Get count of active products
        long productCount = productRepository.count();
        
        if (productCount == 0) {
            return 0.0;
        }
        
        // Calculate expected responses - assume we expect an average of 10 responses per product
        long expectedResponses = productCount * 10;
        
        // Calculate response rate as percentage of expected responses
        return Math.min(((double) totalResponses / expectedResponses) * 100, 100.0);
    }
} 