package com.survey.survey_dashboard.mapper;

import com.survey.survey_dashboard.dto.SurveyResponseDto;
import com.survey.survey_dashboard.model.Product;
import com.survey.survey_dashboard.model.Survey;
import com.survey.survey_dashboard.model.SurveyResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SurveyResponseMapper {

    public SurveyResponseDto toDto(SurveyResponse response) {
        if (response == null) {
            return null;
        }
        
        SurveyResponseDto dto = new SurveyResponseDto();
        dto.setId(response.getId());
        dto.setName(response.getName());
        dto.setEmail(response.getEmail());
        
        if (response.getSurvey() != null) {
            dto.setSurveyId(response.getSurvey().getId());
            dto.setSurveyName(response.getSurvey().getName());
        }
        
        if (response.getProduct() != null) {
            dto.setProductId(response.getProduct().getId());
            dto.setProductName(response.getProduct().getName());
        }
        
        dto.setSatisfaction(response.getSatisfaction());
        dto.setUsability(response.getUsability());
        dto.setPerformance(response.getPerformance());
        dto.setValueForMoney(response.getValueForMoney());
        dto.setRecommendations(response.getRecommendations());
        dto.setComments(response.getComments());
        dto.setSubmissionDate(response.getSubmissionDate());
        
        return dto;
    }
    
    public List<SurveyResponseDto> toDtoList(List<SurveyResponse> responses) {
        return responses.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    
    public SurveyResponse toEntity(SurveyResponseDto dto, Survey survey, Product product) {
        if (dto == null) {
            return null;
        }
        
        SurveyResponse response = new SurveyResponse();
        response.setId(dto.getId());
        response.setName(dto.getName());
        response.setEmail(dto.getEmail());
        response.setSurvey(survey);
        response.setProduct(product);
        response.setSatisfaction(dto.getSatisfaction());
        response.setUsability(dto.getUsability());
        response.setPerformance(dto.getPerformance());
        response.setValueForMoney(dto.getValueForMoney());
        response.setRecommendations(dto.getRecommendations());
        response.setComments(dto.getComments());
        
        return response;
    }
} 