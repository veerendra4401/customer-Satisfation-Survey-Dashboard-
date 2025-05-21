package com.survey.survey_dashboard.service;

import com.survey.survey_dashboard.dto.SurveyResponseDto;

import java.time.LocalDateTime;
import java.util.List;

public interface SurveyResponseService {
    List<SurveyResponseDto> getAllResponses();
    SurveyResponseDto getResponseById(Long id);
    SurveyResponseDto submitResponse(SurveyResponseDto responseDto);
    List<SurveyResponseDto> getResponsesBySurveyId(Long surveyId);
    List<SurveyResponseDto> getResponsesByProductId(Long productId);
    List<SurveyResponseDto> getResponsesByDateRange(LocalDateTime start, LocalDateTime end);
    long countResponsesBySurveyId(Long surveyId);
    long countResponsesByProductId(Long productId);
    double getAverageSatisfactionByProductId(Long productId);
    double getAverageSatisfactionBySurveyId(Long surveyId);
    void deleteResponse(Long id);
} 