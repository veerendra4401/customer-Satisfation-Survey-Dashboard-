package com.survey.survey_dashboard.mapper;

import com.survey.survey_dashboard.dto.SurveyDto;
import com.survey.survey_dashboard.model.Survey;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SurveyMapper {

    public SurveyDto toDto(Survey survey) {
        if (survey == null) {
            return null;
        }
        
        SurveyDto dto = new SurveyDto();
        dto.setId(survey.getId());
        dto.setName(survey.getName());
        dto.setDescription(survey.getDescription());
        dto.setCategory(survey.getCategory());
        dto.setActive(survey.isActive());
        dto.setQuestionCount(survey.getQuestionCount());
        dto.setResponseCount(survey.getResponses() != null ? survey.getResponses().size() : 0);
        dto.setCreatedDate(survey.getCreatedDate());
        dto.setLastModified(survey.getLastModified());
        
        return dto;
    }
    
    public List<SurveyDto> toDtoList(List<Survey> surveys) {
        return surveys.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    
    public Survey toEntity(SurveyDto dto) {
        if (dto == null) {
            return null;
        }
        
        Survey survey = new Survey();
        survey.setId(dto.getId());
        survey.setName(dto.getName());
        survey.setDescription(dto.getDescription());
        survey.setCategory(dto.getCategory());
        survey.setActive(dto.isActive());
        survey.setQuestionCount(dto.getQuestionCount());
        
        return survey;
    }
    
    public void updateEntityFromDto(SurveyDto dto, Survey survey) {
        if (dto == null || survey == null) {
            return;
        }
        
        survey.setName(dto.getName());
        survey.setDescription(dto.getDescription());
        survey.setCategory(dto.getCategory());
        survey.setActive(dto.isActive());
        survey.setQuestionCount(dto.getQuestionCount());
    }
} 