/**
 * Utility functions for formatting data in the survey dashboard
 */

// Format dates in a consistent way
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format numbers with commas for thousands
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Format percentage values
export const formatPercentage = (value) => {
  return `${Math.round(value)}%`;
};

// Format rating values to one decimal place
export const formatRating = (rating) => {
  return parseFloat(rating).toFixed(1);
};

// Get appropriate color class based on satisfaction score
export const getSatisfactionColorClass = (score) => {
  if (score >= 4.0) return 'text-success';
  if (score >= 3.0) return 'text-warning';
  return 'text-danger';
};

// Get trend icon based on score
export const getTrendIcon = (score) => {
  if (score >= 4.0) return '↑';
  if (score < 3.5) return '↓';
  return '→';
};

// Get trend text based on score
export const getTrendText = (score) => {
  if (score >= 4.0) return 'Positive';
  if (score < 3.5) return 'Negative';
  return 'Stable';
}; 