package com.survey.survey_dashboard.controller;

import com.survey.survey_dashboard.dto.SurveyResponseDto;
import com.survey.survey_dashboard.service.SurveyResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/responses")
public class SurveyResponseController {

    private final SurveyResponseService responseService;

    @Autowired
    public SurveyResponseController(SurveyResponseService responseService) {
        this.responseService = responseService;
    }

    @GetMapping
    public ResponseEntity<List<SurveyResponseDto>> getAllResponses() {
        List<SurveyResponseDto> responses = responseService.getAllResponses();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SurveyResponseDto> getResponseById(@PathVariable Long id) {
        SurveyResponseDto response = responseService.getResponseById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/survey/{surveyId}")
    public ResponseEntity<List<SurveyResponseDto>> getResponsesBySurveyId(@PathVariable Long surveyId) {
        List<SurveyResponseDto> responses = responseService.getResponsesBySurveyId(surveyId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<SurveyResponseDto>> getResponsesByProductId(@PathVariable Long productId) {
        List<SurveyResponseDto> responses = responseService.getResponsesByProductId(productId);
        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<SurveyResponseDto> submitResponse(@Validated @RequestBody SurveyResponseDto responseDto) {
        SurveyResponseDto submittedResponse = responseService.submitResponse(responseDto);
        return new ResponseEntity<>(submittedResponse, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SurveyResponseDto> updateResponse(@PathVariable Long id, @Validated @RequestBody SurveyResponseDto responseDto) {
        responseDto.setId(id);
        SurveyResponseDto updatedResponse = responseService.submitResponse(responseDto);
        return ResponseEntity.ok(updatedResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResponse(@PathVariable Long id) {
        responseService.deleteResponse(id);
        return ResponseEntity.noContent().build();
    }
} 