import React, { useState, useEffect } from 'react';
import RatingInput from '../../components/survey/RatingInput';
import { validateSurveyForm } from '../../utils/validators';
import surveyApi from '../../services/api';

const SurveyPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    productId: '',
    surveyId: 1, // Default to the first survey
    satisfaction: '3',
    usability: '3',
    performance: '3',
    valueForMoney: '3',
    recommendations: '3',
    comments: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [submitError, setSubmitError] = useState(null);

  // Fetch products from API
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateSurveyForm(formData);
    if (formErrors) {
      setErrors(formErrors);
      return;
    }
    
    try {
      setLoading(true);
      setSubmitError(null);
      
      // Convert numeric strings to numbers and prepare data for submission
      const responseData = {
        ...formData,
        productId: parseInt(formData.productId),
        surveyId: parseInt(formData.surveyId),
        satisfaction: parseInt(formData.satisfaction),
        usability: parseInt(formData.usability),
        performance: parseInt(formData.performance),
        valueForMoney: parseInt(formData.valueForMoney),
        recommendations: parseInt(formData.recommendations),
        submissionDate: new Date().toISOString()
      };
      
      // Submit to API
      await surveyApi.submitSurvey(responseData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        productId: '',
        surveyId: 1,
        satisfaction: '3',
        usability: '3',
        performance: '3',
        valueForMoney: '3',
        recommendations: '3',
        comments: '',
      });
      
      setSubmitted(true);
      setLoading(false);
      
      // Reset the submitted state after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting survey:', error);
      setSubmitError('There was an error submitting your survey. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Customer Satisfaction Survey</h2>
      
      {/* Thank you message after submission */}
      {submitted && (
        <div className="alert alert-success mb-4" role="alert">
          <h4 className="alert-heading">Thank you for your feedback!</h4>
          <p>Your response has been recorded. We greatly appreciate your time and input.</p>
        </div>
      )}
      
      {/* Error message */}
      {submitError && (
        <div className="alert alert-danger mb-4" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{submitError}</p>
        </div>
      )}
      
      <div className="card">
        <div className="card-body">
          <p className="card-text">
            We value your feedback! Please take a moment to complete this survey about your experience
            with our products. Your responses will help us improve our services.
          </p>
          
          {loading && !submitted ? (
            <div className="d-flex justify-content-center my-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <form className="survey-form mt-4" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">
                    Name
                    <span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email
                    <span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="productId" className="form-label">
                  Product
                  <span className="text-danger ms-1">*</span>
                </label>
                <select
                  className={`form-select ${errors.productId ? 'is-invalid' : ''}`}
                  id="productId"
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                {errors.productId && (
                  <div className="invalid-feedback">{errors.productId}</div>
                )}
              </div>
              
              <hr className="my-4" />
              <h5>Please rate your experience (1=Poor, 5=Excellent)</h5>
              
              {/* Use our reusable RatingInput component for all ratings */}
              <RatingInput
                name="satisfaction"
                label="Overall Satisfaction"
                value={formData.satisfaction}
                onChange={handleChange}
                required
              />
              
              <RatingInput
                name="usability"
                label="Ease of Use"
                value={formData.usability}
                onChange={handleChange}
                required
              />
              
              <RatingInput
                name="performance"
                label="Performance"
                value={formData.performance}
                onChange={handleChange}
                required
              />
              
              <RatingInput
                name="valueForMoney"
                label="Value for Money"
                value={formData.valueForMoney}
                onChange={handleChange}
                required
              />
              
              <RatingInput
                name="recommendations"
                label="Likelihood to Recommend"
                value={formData.recommendations}
                onChange={handleChange}
                required
              />
              
              <div className="mb-3">
                <label htmlFor="comments" className="form-label">Additional Comments</label>
                <textarea
                  className="form-control"
                  id="comments"
                  name="comments"
                  rows="4"
                  value={formData.comments}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Submitting...
                    </>
                  ) : 'Submit Survey'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyPage; 