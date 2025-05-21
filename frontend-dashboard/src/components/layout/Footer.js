import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-3 mt-5">
      <div className="container text-center">
        <p className="mb-0">
          &copy; {currentYear} Customer Satisfaction Survey Dashboard. All rights reserved.
        </p>
        <p className="mb-0 mt-1">
          <small>Built with Java EE and React</small>
        </p>
      </div>
    </footer>
  );
};

export default Footer; 