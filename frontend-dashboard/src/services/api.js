import axios from 'axios';

// Base URL of the backend API
const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with base config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// API endpoints
const surveyApi = {
  // Survey endpoints
  submitSurvey: (surveyData) => {
    return apiClient.post('/responses', surveyData);
  },
  
  getSurveys: () => {
    return apiClient.get('/surveys');
  },
  
  getSurveyById: (id) => {
    return apiClient.get(`/surveys/${id}`);
  },
  
  // Products endpoints
  getProducts: () => {
    return apiClient.get('/products');
  },
  
  getProductById: (id) => {
    return apiClient.get(`/products/${id}`);
  },
  
  createProduct: (productData) => {
    return apiClient.post('/products', productData);
  },
  
  updateProduct: (id, productData) => {
    return apiClient.put(`/products/${id}`, productData);
  },
  
  deleteProduct: (id) => {
    return apiClient.delete(`/products/${id}`);
  },
  
  // Dashboard data endpoints
  getDashboardStats: (filters) => {
    return apiClient.get('/dashboard/stats', { params: filters });
  },
  
  getProductBreakdown: (filters) => {
    return apiClient.get('/dashboard/products', { params: filters });
  },
  
  getSatisfactionByCategory: (filters) => {
    return apiClient.get('/dashboard/categories', { params: filters });
  },
  
  // Reports endpoints
  getReports: () => {
    return apiClient.get('/reports');
  },
  
  generateReport: (reportType, params) => {
    return apiClient.post('/reports/generate', { reportType, params });
  }
};

export default surveyApi; 