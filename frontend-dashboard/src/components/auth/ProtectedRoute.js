import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, loading, isAdmin } = useAuth();
  const location = useLocation();
  
  // Show loading spinner while auth state is being determined
  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  // Check if user is authenticated
  if (!currentUser) {
    // Redirect to login page, but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If route requires admin privileges, check if user is admin
  if (adminOnly && !isAdmin()) {
    // Redirect to home if not an admin
    return <Navigate to="/" replace />;
  }
  
  // User is authenticated (and is admin if required), render the protected route
  return children;
};

export default ProtectedRoute; 