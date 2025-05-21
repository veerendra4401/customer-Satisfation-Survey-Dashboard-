import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (username, password) => {
    // For demo purposes, hardcoded credentials
    // In a real app, you would call an API to authenticate
    if (username === 'admin' && password === 'password123') {
      const user = {
        username: 'admin',
        role: 'admin',
        name: 'Administrator'
      };
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true };
    }
    return { 
      success: false, 
      message: 'Invalid username or password' 
    };
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  // Check if user is admin
  const isAdmin = () => {
    return currentUser && currentUser.role === 'admin';
  };

  // Return context provider
  return (
    <AuthContext.Provider 
      value={{ 
        currentUser, 
        login, 
        logout, 
        isAdmin,
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
}; 