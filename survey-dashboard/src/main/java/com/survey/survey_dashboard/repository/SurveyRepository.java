package com.survey.survey_dashboard.repository;

import com.survey.survey_dashboard.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {
    List<Survey> findByActive(boolean active);
    List<Survey> findByCategory(String category);
    List<Survey> findByCategoryAndActive(String category, boolean active);
    
    @Query("SELECT s FROM Survey s LEFT JOIN FETCH s.responses WHERE s.id = :id")
    Survey findByIdWithResponses(Long id);
} 