import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatters';

/**
 * A reusable card component for displaying survey information
 */
const SurveyCard = ({ 
  survey, 
  showActions = true, 
  onTakeSurvey, 
  onViewResults 
}) => {
  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{survey.name}</h5>
        {survey.isActive && (
          <span className="badge bg-success">Active</span>
        )}
        {!survey.isActive && (
          <span className="badge bg-secondary">Inactive</span>
        )}
      </div>
      <div className="card-body">
        <div className="mb-2">
          <strong>Category:</strong> {survey.category}
        </div>
        <div className="mb-2">
          <strong>Questions:</strong> {survey.questionCount}
        </div>
        <div className="mb-2">
          <strong>Responses:</strong> {survey.responseCount}
        </div>
        {survey.createdDate && (
          <div className="mb-2">
            <strong>Created:</strong> {formatDate(survey.createdDate)}
          </div>
        )}
        {survey.lastModified && (
          <div className="mb-2">
            <strong>Last Modified:</strong> {formatDate(survey.lastModified)}
          </div>
        )}
        <p className="card-text mt-3">
          {survey.description || 'No description available.'}
        </p>
        
        {showActions && (
          <div className="d-flex gap-2 mt-3">
            {onTakeSurvey && (
              <button 
                className="btn btn-primary" 
                onClick={() => onTakeSurvey(survey.id)}
              >
                Take Survey
              </button>
            )}
            {onViewResults && (
              <button 
                className="btn btn-outline-primary" 
                onClick={() => onViewResults(survey.id)}
              >
                View Results
              </button>
            )}
            {!onTakeSurvey && !onViewResults && (
              <>
                <Link to={`/survey/${survey.id}`} className="btn btn-primary">
                  Take Survey
                </Link>
                <Link to={`/dashboard/survey/${survey.id}`} className="btn btn-outline-primary">
                  View Results
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

SurveyCard.propTypes = {
  survey: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    description: PropTypes.string,
    questionCount: PropTypes.number,
    responseCount: PropTypes.number,
    isActive: PropTypes.bool,
    createdDate: PropTypes.string,
    lastModified: PropTypes.string
  }).isRequired,
  showActions: PropTypes.bool,
  onTakeSurvey: PropTypes.func,
  onViewResults: PropTypes.func
};

export default SurveyCard; 