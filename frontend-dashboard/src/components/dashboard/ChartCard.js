import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable chart card component for dashboards
 * Wraps chart components in a consistent card layout
 */
const ChartCard = ({ 
  title, 
  subtitle = null, 
  children, 
  toolbar = null, 
  height = 300,
  footer = null
}) => {
  return (
    <div className="card h-100">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0">{title}</h5>
          {subtitle && <div className="text-muted small">{subtitle}</div>}
        </div>
        {toolbar && <div className="chart-toolbar">{toolbar}</div>}
      </div>
      <div className="card-body">
        <div 
          className="chart-container" 
          style={{ height: typeof height === 'number' ? `${height}px` : height }}
        >
          {children}
        </div>
      </div>
      {footer && (
        <div className="card-footer bg-transparent">
          {footer}
        </div>
      )}
    </div>
  );
};

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  toolbar: PropTypes.node,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  footer: PropTypes.node
};

export default ChartCard; 