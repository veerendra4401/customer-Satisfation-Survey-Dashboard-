package com.survey.survey_dashboard.service;

import com.survey.survey_dashboard.dto.SurveyDto;

import java.util.List;

public interface SurveyService {
    List<SurveyDto> getAllSurveys();
    List<SurveyDto> getActiveSurveys();
    SurveyDto getSurveyById(Long id);
    SurveyDto createSurvey(SurveyDto surveyDto);
    SurveyDto updateSurvey(Long id, SurveyDto surveyDto);
    void deleteSurvey(Long id);
    List<SurveyDto> getSurveysByCategory(String category);
} 