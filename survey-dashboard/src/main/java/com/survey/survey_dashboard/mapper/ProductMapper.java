package com.survey.survey_dashboard.mapper;

import com.survey.survey_dashboard.dto.ProductDto;
import com.survey.survey_dashboard.model.Product;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {

    public ProductDto toDto(Product product) {
        if (product == null) {
            return null;
        }
        
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setCategory(product.getCategory());
        dto.setDescription(product.getDescription());
        dto.setActive(product.isActive());
        dto.setCreatedDate(product.getCreatedDate());
        dto.setLastModified(product.getLastModified());
        
        return dto;
    }
    
    public List<ProductDto> toDtoList(List<Product> products) {
        return products.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    
    public Product toEntity(ProductDto dto) {
        if (dto == null) {
            return null;
        }
        
        Product product = new Product();
        product.setId(dto.getId());
        product.setName(dto.getName());
        product.setCategory(dto.getCategory());
        product.setDescription(dto.getDescription());
        product.setActive(dto.isActive());
        
        return product;
    }
    
    public void updateEntityFromDto(ProductDto dto, Product product) {
        if (dto == null || product == null) {
            return;
        }
        
        product.setName(dto.getName());
        product.setCategory(dto.getCategory());
        product.setDescription(dto.getDescription());
        product.setActive(dto.isActive());
    }
} 