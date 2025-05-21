package com.survey.survey_dashboard.controller;

import com.survey.survey_dashboard.dto.SurveyDto;
import com.survey.survey_dashboard.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@RestController
@RequestMapping("/api/surveys")
public class SurveyController {

    private final SurveyService surveyService;

    @Autowired
    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @GetMapping
    public ResponseEntity<List<SurveyDto>> getAllSurveys() {
        List<SurveyDto> surveys = surveyService.getAllSurveys();
        return ResponseEntity.ok(surveys);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SurveyDto> getSurveyById(@PathVariable Long id) {
        SurveyDto survey = surveyService.getSurveyById(id);
        return ResponseEntity.ok(survey);
    }

    @PostMapping
    public ResponseEntity<SurveyDto> createSurvey(@Validated @RequestBody SurveyDto surveyDto) {
        SurveyDto createdSurvey = surveyService.createSurvey(surveyDto);
        return new ResponseEntity<>(createdSurvey, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SurveyDto> updateSurvey(@PathVariable Long id, @Validated @RequestBody SurveyDto surveyDto) {
        SurveyDto updatedSurvey = surveyService.updateSurvey(id, surveyDto);
        return ResponseEntity.ok(updatedSurvey);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSurvey(@PathVariable Long id) {
        surveyService.deleteSurvey(id);
        return ResponseEntity.noContent().build();
    }
} 