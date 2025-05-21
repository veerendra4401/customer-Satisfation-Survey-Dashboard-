package com.survey.survey_dashboard.service.impl;

import com.survey.survey_dashboard.dto.SurveyDto;
import com.survey.survey_dashboard.exception.ResourceNotFoundException;
import com.survey.survey_dashboard.mapper.SurveyMapper;
import com.survey.survey_dashboard.model.Survey;
import com.survey.survey_dashboard.repository.SurveyRepository;
import com.survey.survey_dashboard.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SurveyServiceImpl implements SurveyService {

    private final SurveyRepository surveyRepository;
    private final SurveyMapper surveyMapper;

    @Autowired
    public SurveyServiceImpl(SurveyRepository surveyRepository, SurveyMapper surveyMapper) {
        this.surveyRepository = surveyRepository;
        this.surveyMapper = surveyMapper;
    }

    @Override
    public List<SurveyDto> getAllSurveys() {
        List<Survey> surveys = surveyRepository.findAll();
        return surveyMapper.toDtoList(surveys);
    }

    @Override
    public List<SurveyDto> getActiveSurveys() {
        List<Survey> surveys = surveyRepository.findByActive(true);
        return surveyMapper.toDtoList(surveys);
    }

    @Override
    public SurveyDto getSurveyById(Long id) {
        Survey survey = surveyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Survey not found with id: " + id));
        return surveyMapper.toDto(survey);
    }

    @Override
    @Transactional
    public SurveyDto createSurvey(SurveyDto surveyDto) {
        Survey survey = surveyMapper.toEntity(surveyDto);
        survey = surveyRepository.save(survey);
        return surveyMapper.toDto(survey);
    }

    @Override
    @Transactional
    public SurveyDto updateSurvey(Long id, SurveyDto surveyDto) {
        Survey survey = surveyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Survey not found with id: " + id));
        
        surveyMapper.updateEntityFromDto(surveyDto, survey);
        survey = surveyRepository.save(survey);
        return surveyMapper.toDto(survey);
    }

    @Override
    @Transactional
    public void deleteSurvey(Long id) {
        if (!surveyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Survey not found with id: " + id);
        }
        surveyRepository.deleteById(id);
    }

    @Override
    public List<SurveyDto> getSurveysByCategory(String category) {
        List<Survey> surveys = surveyRepository.findByCategory(category);
        return surveyMapper.toDtoList(surveys);
    }
} 