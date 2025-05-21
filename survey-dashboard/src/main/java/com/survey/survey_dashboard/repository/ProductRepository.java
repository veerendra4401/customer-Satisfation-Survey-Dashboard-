package com.survey.survey_dashboard.repository;

import com.survey.survey_dashboard.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActive(boolean active);
    List<Product> findByCategory(String category);
    List<Product> findByCategoryAndActive(String category, boolean active);
} 