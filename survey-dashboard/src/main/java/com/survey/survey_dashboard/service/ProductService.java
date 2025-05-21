package com.survey.survey_dashboard.service;

import com.survey.survey_dashboard.dto.ProductDto;

import java.util.List;

public interface ProductService {
    List<ProductDto> getAllProducts();
    List<ProductDto> getActiveProducts();
    ProductDto getProductById(Long id);
    ProductDto createProduct(ProductDto productDto);
    ProductDto updateProduct(Long id, ProductDto productDto);
    void deleteProduct(Long id);
    List<ProductDto> getProductsByCategory(String category);
} 