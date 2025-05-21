/**
 * Utility functions for validating form inputs in the survey dashboard
 */

// Validate email address format
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validate that a field is not empty
export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

// Validate minimum length of a text field
export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

// Validate maximum length of a text field
export const validateMaxLength = (value, maxLength) => {
  return value && value.length <= maxLength;
};

// Validate numeric range
export const validateNumericRange = (value, min, max) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
};

// Validate a complete survey form
export const validateSurveyForm = (formData) => {
  const errors = {};
  
  if (!validateRequired(formData.name)) {
    errors.name = 'Name is required';
  }
  
  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!validateRequired(formData.productId)) {
    errors.productId = 'Please select a product';
  }
  
  // Return null if no errors, otherwise return error object
  return Object.keys(errors).length === 0 ? null : errors;
}; 