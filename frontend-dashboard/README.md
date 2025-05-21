# Customer Satisfaction Survey Dashboard Frontend

This is the frontend part of the Customer Satisfaction Survey Dashboard project, a comprehensive system for customer feedback monitoring and analysis with dynamic dashboards.

## Features

- **User-friendly Survey Form**: Collect detailed customer feedback on products and services
- **Dynamic Dashboards**: Visualize customer satisfaction data with interactive charts and graphs
- **Admin Panel**: Manage products, surveys, and generate reports
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React.js - Frontend framework
- Bootstrap - UI components and styling
- Chart.js - For data visualization
- Axios - For API communication

## Project Structure

```
src/
├── assets/         # Static assets (images, icons)
├── components/     # Reusable UI components
│   ├── dashboard/  # Dashboard-specific components
│   ├── layout/     # Layout components (Header, Footer)
│   └── survey/     # Survey-specific components
├── pages/          # Page components
│   ├── Admin/      # Admin dashboard pages
│   ├── Dashboard/  # Data visualization pages
│   ├── Home/       # Landing page
│   └── Survey/     # Survey form pages
├── services/       # API communication services
└── utils/          # Utility functions
```

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

1. Clone the repository
2. Navigate to the frontend-dashboard directory
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open your browser and go to `http://localhost:3000`

## Backend Integration

This frontend is designed to work with a Java/Java EE backend with MySQL database. The API service (`src/services/api.js`) is configured to communicate with the backend endpoints.

## Future Enhancements

- User authentication and role-based access control
- Multi-language support
- Advanced analytics and AI-powered insights
- Export data in various formats (PDF, Excel, CSV)
- Email notifications and scheduled reports
