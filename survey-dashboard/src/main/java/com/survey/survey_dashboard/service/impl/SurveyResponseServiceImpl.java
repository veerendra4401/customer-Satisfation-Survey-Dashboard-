package com.survey.survey_dashboard.service.impl;

import com.survey.survey_dashboard.dto.SurveyResponseDto;
import com.survey.survey_dashboard.exception.ResourceNotFoundException;
import com.survey.survey_dashboard.mapper.SurveyResponseMapper;
import com.survey.survey_dashboard.model.Product;
import com.survey.survey_dashboard.model.Survey;
import com.survey.survey_dashboard.model.SurveyResponse;
import com.survey.survey_dashboard.repository.ProductRepository;
import com.survey.survey_dashboard.repository.SurveyRepository;
import com.survey.survey_dashboard.repository.SurveyResponseRepository;
import com.survey.survey_dashboard.service.SurveyResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SurveyResponseServiceImpl implements SurveyResponseService {

    private final SurveyResponseRepository responseRepository;
    private final SurveyRepository surveyRepository;
    private final ProductRepository productRepository;
    private final SurveyResponseMapper responseMapper;

    @Autowired
    public SurveyResponseServiceImpl(
            SurveyResponseRepository responseRepository,
            SurveyRepository surveyRepository,
            ProductRepository productRepository,
            SurveyResponseMapper responseMapper) {
        this.responseRepository = responseRepository;
        this.surveyRepository = surveyRepository;
        this.productRepository = productRepository;
        this.responseMapper = responseMapper;
    }

    @Override
    public List<SurveyResponseDto> getAllResponses() {
        List<SurveyResponse> responses = responseRepository.findAll();
        return responseMapper.toDtoList(responses);
    }

    @Override
    public SurveyResponseDto getResponseById(Long id) {
        SurveyResponse response = responseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Response not found with id: " + id));
        return responseMapper.toDto(response);
    }

    @Override
    @Transactional
    public SurveyResponseDto submitResponse(SurveyResponseDto responseDto) {
        Survey survey = surveyRepository.findById(responseDto.getSurveyId())
                .orElseThrow(() -> new ResourceNotFoundException("Survey not found with id: " + responseDto.getSurveyId()));
        
        Product product = productRepository.findById(responseDto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + responseDto.getProductId()));
        
        SurveyResponse response = responseMapper.toEntity(responseDto, survey, product);
        response = responseRepository.save(response);
        return responseMapper.toDto(response);
    }

    @Override
    public List<SurveyResponseDto> getResponsesBySurveyId(Long surveyId) {
        if (!surveyRepository.existsById(surveyId)) {
            throw new ResourceNotFoundException("Survey not found with id: " + surveyId);
        }
        
        List<SurveyResponse> responses = responseRepository.findBySurveyId(surveyId);
        return responseMapper.toDtoList(responses);
    }

    @Override
    public List<SurveyResponseDto> getResponsesByProductId(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }
        
        List<SurveyResponse> responses = responseRepository.findByProductId(productId);
        return responseMapper.toDtoList(responses);
    }

    @Override
    public List<SurveyResponseDto> getResponsesByDateRange(LocalDateTime start, LocalDateTime end) {
        List<SurveyResponse> responses = responseRepository.findBySubmissionDateBetween(start, end);
        return responseMapper.toDtoList(responses);
    }

    @Override
    public long countResponsesBySurveyId(Long surveyId) {
        if (!surveyRepository.existsById(surveyId)) {
            throw new ResourceNotFoundException("Survey not found with id: " + surveyId);
        }
        return responseRepository.countBySurveyId(surveyId);
    }

    @Override
    public long countResponsesByProductId(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }
        return responseRepository.countByProductId(productId);
    }

    @Override
    public double getAverageSatisfactionByProductId(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }
        
        Double avgSatisfaction = responseRepository.getAverageSatisfactionByProductId(productId);
        return avgSatisfaction != null ? avgSatisfaction : 0.0;
    }

    @Override
    public double getAverageSatisfactionBySurveyId(Long surveyId) {
        if (!surveyRepository.existsById(surveyId)) {
            throw new ResourceNotFoundException("Survey not found with id: " + surveyId);
        }
        
        Double avgSatisfaction = responseRepository.getAverageSatisfactionBySurveyId(surveyId);
        return avgSatisfaction != null ? avgSatisfaction : 0.0;
    }

    @Override
    @Transactional
    public void deleteResponse(Long id) {
        if (!responseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Response not found with id: " + id);
        }
        responseRepository.deleteById(id);
    }
} 