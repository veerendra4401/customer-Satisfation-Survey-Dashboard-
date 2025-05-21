import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable rating input component for surveys
 * Displays a set of radio buttons for selecting a rating value
 */
const RatingInput = ({ 
  name, 
  label, 
  value, 
  onChange, 
  min = 1, 
  max = 5, 
  required = false
}) => {
  // Generate array of numbers from min to max
  const ratings = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>
      <div className="rating-group">
        {ratings.map(num => (
          <div key={num} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={`${name}${num}`}
              value={num}
              checked={value === num.toString()}
              onChange={onChange}
              required={required}
            />
            <label className="form-check-label" htmlFor={`${name}${num}`}>
              {num}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

RatingInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  required: PropTypes.bool
};

export default RatingInput; 