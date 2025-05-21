import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import surveyApi from '../../services/api';

/**
 * A reusable filter bar component for dashboards
 * Provides consistent UI for filtering dashboard data
 */
const FilterBar = ({ 
  filters, 
  onChange, 
  onApply,
  showApplyButton = false
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await surveyApi.getProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle input change
  const handleChange = (name, value) => {
    onChange({ ...filters, [name]: value });
  };

  // Apply filters (if using the apply button)
  const handleApply = (e) => {
    e.preventDefault();
    if (onApply) onApply(filters);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <form onSubmit={handleApply}>
          <div className="row">
            {/* Product Filter */}
            <div className="col-md-4 mb-3 mb-md-0">
              <label htmlFor="productFilter" className="form-label">Product</label>
              <select 
                className="form-select" 
                id="productFilter" 
                value={filters.product || 'all'} 
                onChange={(e) => handleChange('product', e.target.value)}
                disabled={loading}
              >
                <option value="all">All Products</option>
                {products.map(product => (
                  <option key={product.id} value={product.id.toString()}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Date Range Filter */}
            <div className="col-md-4 mb-3 mb-md-0">
              <label htmlFor="dateRangeFilter" className="form-label">Date Range</label>
              <select 
                className="form-select" 
                id="dateRangeFilter" 
                value={filters.dateRange || 'month'} 
                onChange={(e) => handleChange('dateRange', e.target.value)}
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
            
            {/* Category Filter */}
            <div className="col-md-4 mb-3 mb-md-0">
              <label htmlFor="categoryFilter" className="form-label">Category</label>
              <select 
                className="form-select" 
                id="categoryFilter" 
                value={filters.category || 'all'} 
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Audio">Audio</option>
                <option value="Software">Software</option>
                <option value="Hardware">Hardware</option>
                <option value="Service">Service</option>
              </select>
            </div>
          </div>
          
          {showApplyButton && (
            <div className="d-flex justify-content-end mt-3">
              <button type="submit" className="btn btn-primary">
                Apply Filters
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  filters: PropTypes.shape({
    product: PropTypes.string,
    dateRange: PropTypes.string,
    category: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onApply: PropTypes.func,
  showApplyButton: PropTypes.bool
};

export default FilterBar; 