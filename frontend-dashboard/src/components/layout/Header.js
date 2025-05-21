import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="bg-primary text-white">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Customer Satisfaction Dashboard
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/survey">
                  Take Survey
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              
              {/* Only show Admin link if user is admin */}
              {isAdmin() && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              )}
              
              {/* Login/Logout button */}
              <li className="nav-item">
                {currentUser ? (
                  <button 
                    className="btn btn-outline-light ms-2" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <Link className="btn btn-outline-light ms-2" to="/login">
                    Login
                  </Link>
                )}
              </li>
              
              {/* Show username if logged in */}
              {currentUser && (
                <li className="nav-item">
                  <span className="nav-link ms-2">
                    <i className="bi bi-person-circle me-1"></i>
                    {currentUser.name}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 