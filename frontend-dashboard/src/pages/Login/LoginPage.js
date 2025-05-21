import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path or default to home page
  const redirectPath = location.state?.from?.pathname || '/';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      const result = login(username, password);
      
      if (result.success) {
        navigate(redirectPath);
      } else {
        setError(result.message || 'Failed to log in');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <div className="text-center mb-4">
              <div className="mb-3" style={{
                width: '70px',
                height: '70px',
                borderRadius: '8px',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: '0 8px 12px -4px rgba(59, 130, 246, 0.3)'
              }}>
                <span style={{
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>CS</span>
              </div>
              <h4 className="card-title">Admin Login</h4>
              <p className="text-muted">Sign in to manage your dashboard</p>
            </div>
            
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing in...
                    </>
                  ) : 'Sign In'}
                </button>
              </div>
            </form>
            
            <div className="mt-4 text-center">
              <small className="text-muted">
                <strong></strong>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 