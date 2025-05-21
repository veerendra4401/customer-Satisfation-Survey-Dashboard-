package com.survey.survey_dashboard.repository;

import com.survey.survey_dashboard.model.SurveyResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SurveyResponseRepository extends JpaRepository<SurveyResponse, Long> {
    List<SurveyResponse> findBySurveyId(Long surveyId);
    List<SurveyResponse> findByProductId(Long productId);
    List<SurveyResponse> findBySurveyIdAndProductId(Long surveyId, Long productId);
    List<SurveyResponse> findBySubmissionDateBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT AVG(sr.satisfaction) FROM SurveyResponse sr WHERE sr.product.id = :productId")
    Double getAverageSatisfactionByProductId(Long productId);
    
    @Query("SELECT AVG(sr.satisfaction) FROM SurveyResponse sr WHERE sr.survey.id = :surveyId")
    Double getAverageSatisfactionBySurveyId(Long surveyId);
    
    @Query("SELECT COUNT(sr) FROM SurveyResponse sr WHERE sr.product.id = :productId")
    Long countByProductId(Long productId);
    
    @Query("SELECT COUNT(sr) FROM SurveyResponse sr WHERE sr.survey.id = :surveyId")
    Long countBySurveyId(Long surveyId);
} 