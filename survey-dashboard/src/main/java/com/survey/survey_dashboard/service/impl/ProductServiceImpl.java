package com.survey.survey_dashboard.service.impl;

import com.survey.survey_dashboard.dto.ProductDto;
import com.survey.survey_dashboard.exception.ResourceNotFoundException;
import com.survey.survey_dashboard.mapper.ProductMapper;
import com.survey.survey_dashboard.model.Product;
import com.survey.survey_dashboard.repository.ProductRepository;
import com.survey.survey_dashboard.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return productMapper.toDtoList(products);
    }

    @Override
    public List<ProductDto> getActiveProducts() {
        List<Product> products = productRepository.findByActive(true);
        return productMapper.toDtoList(products);
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return productMapper.toDto(product);
    }

    @Override
    @Transactional
    public ProductDto createProduct(ProductDto productDto) {
        Product product = productMapper.toEntity(productDto);
        product = productRepository.save(product);
        return productMapper.toDto(product);
    }

    @Override
    @Transactional
    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        
        productMapper.updateEntityFromDto(productDto, product);
        product = productRepository.save(product);
        return productMapper.toDto(product);
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    @Override
    public List<ProductDto> getProductsByCategory(String category) {
        List<Product> products = productRepository.findByCategory(category);
        return productMapper.toDtoList(products);
    }
} 