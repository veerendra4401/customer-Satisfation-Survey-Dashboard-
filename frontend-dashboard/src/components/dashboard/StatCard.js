import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable statistic card component for dashboards
 * Displays a metric with a title and optional icon
 */
const StatCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary',
  trend = null,
  trendDirection = null,
  suffix = '',
  prefix = ''
}) => {
  // Helper function to get trend class
  const getTrendClass = () => {
    if (!trendDirection) return '';
    return trendDirection === 'up' 
      ? 'text-success' 
      : trendDirection === 'down' 
        ? 'text-danger' 
        : 'text-warning';
  };

  // Helper function to get trend icon
  const getTrendIcon = () => {
    return trendDirection === 'up' 
      ? '↑' 
      : trendDirection === 'down' 
        ? '↓' 
        : '→';
  };
  
  return (
    <div className="card h-100">
      <div className={`card-body stats-card ${icon ? 'has-icon' : ''}`}>
        {icon && (
          <div className={`stats-icon text-${color}`}>
            {icon}
          </div>
        )}
        <div className="stats-content">
          <h3 className={`stats-number text-${color}`}>
            {prefix}{value}{suffix}
          </h3>
          <p className="stats-title">{title}</p>
          
          {trend && (
            <div className={`stats-trend ${getTrendClass()}`}>
              <span className="trend-icon">{getTrendIcon()}</span>
              <span className="trend-value">{trend}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  icon: PropTypes.node,
  color: PropTypes.string,
  trend: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  trendDirection: PropTypes.oneOf(['up', 'down', 'stable']),
  suffix: PropTypes.string,
  prefix: PropTypes.string
};

export default StatCard; 