import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="jumbotron bg-light p-5 rounded">
        <h1 className="display-4">Customer Satisfaction Survey Dashboard</h1>
        <p className="lead">
          Welcome to our customer feedback monitoring and analysis system. This platform helps you collect,
          analyze, and visualize customer feedback for your products and services.
        </p>
        <hr className="my-4" />
        <p>
          Take a survey to provide feedback or view our dashboards to see the overall analysis of customer satisfaction.
        </p>
        <div className="d-flex gap-2">
          <Link to="/survey" className="btn btn-primary btn-lg">
            Take Survey
          </Link>
          <Link to="/dashboard" className="btn btn-outline-primary btn-lg">
            View Dashboard
          </Link>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Customer Feedback</h5>
              <p className="card-text">
                Provide valuable feedback about our products and services to help us improve your experience.
              </p>
              <Link to="/survey" className="btn btn-primary">
                Take Survey
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Data Analysis</h5>
              <p className="card-text">
                View comprehensive analysis of customer satisfaction across different products and projects.
              </p>
              <Link to="/dashboard" className="btn btn-primary">
                View Analytics
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Administration</h5>
              <p className="card-text">
                Access administration tools to manage surveys, questions, and view detailed reports.
              </p>
              <Link to="/admin" className="btn btn-primary">
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 