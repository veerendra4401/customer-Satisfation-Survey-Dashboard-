import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Import custom components
import FilterBar from '../../components/dashboard/FilterBar';
import StatCard from '../../components/dashboard/StatCard';
import ChartCard from '../../components/dashboard/ChartCard';

// Import API service
import surveyApi from '../../services/api';

// Import utilities
import { formatNumber, formatRating, getTrendIcon, getTrendText } from '../../utils/formatters';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DashboardPage = () => {
  // Filter state
  const [filters, setFilters] = useState({
    product: 'all',
    dateRange: 'month',
    category: 'all'
  });
  
  // Data state
  const [dashboardData, setDashboardData] = useState({
    totalSurveys: 0,
    totalResponses: 0,
    avgSatisfaction: 0,
    responseRate: 0,
    productBreakdown: []
  });
  
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch dashboard stats
        const statsResponse = await surveyApi.getDashboardStats(filters);
        setDashboardData(statsResponse.data);
        
        // Fetch product breakdown
        const productResponse = await surveyApi.getProductBreakdown(filters);
        setProductData(productResponse.data);
        
        // Fetch category data
        const categoryResponse = await surveyApi.getSatisfactionByCategory(filters);
        setCategoryData(categoryResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [filters]);
  
  // Bar chart data based on API response
  const barChartData = {
    labels: categoryData.length > 0 ? categoryData.map(item => item.category) : [],
    datasets: [
      {
        label: 'Average Rating',
        data: categoryData.length > 0 ? categoryData.map(item => item.avgSatisfaction) : [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  // Pie chart data based on API response
  const pieChartData = {
    labels: productData.length > 0 ? productData.map(item => item.product) : [],
    datasets: [
      {
        label: 'Survey Count',
        data: productData.length > 0 ? productData.map(item => item.count) : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Satisfaction Metrics',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 5,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Survey Distribution by Product',
      },
    },
  };

  // Handle filters change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <h2 className="mb-4">Customer Satisfaction Dashboard</h2>
      
      {/* Filters */}
      <FilterBar 
        filters={filters} 
        onChange={handleFilterChange} 
      />
      
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-3 mb-3 mb-md-0">
              <StatCard 
                title="Total Surveys" 
                value={formatNumber(dashboardData.totalSurveys)} 
                color="primary"
              />
            </div>
            <div className="col-md-3 mb-3 mb-md-0">
              <StatCard 
                title="Avg. Satisfaction" 
                value={formatRating(dashboardData.avgSatisfaction)} 
                color="success"
              />
            </div>
            <div className="col-md-3 mb-3 mb-md-0">
              <StatCard 
                title="Response Rate" 
                value={dashboardData.responseRate.toFixed(0)} 
                color="info"
                suffix="%"
              />
            </div>
            <div className="col-md-3">
              <StatCard 
                title="Total Responses" 
                value={formatNumber(dashboardData.totalResponses)} 
                color="warning"
              />
            </div>
          </div>
          
          {/* Charts */}
          <div className="row">
            <div className="col-md-8 mb-4">
              <ChartCard 
                title="Satisfaction by Category"
                subtitle={`Showing data for ${filters.dateRange === 'all' ? 'all time' : 'last ' + filters.dateRange}`}
                height={350}
              >
                <Bar data={barChartData} options={barOptions} />
              </ChartCard>
            </div>
            <div className="col-md-4 mb-4">
              <ChartCard 
                title="Survey Distribution"
                height={350}
              >
                <Pie data={pieChartData} options={pieOptions} />
              </ChartCard>
            </div>
          </div>
          
          {/* Product Table */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Product Breakdown</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Survey Count</th>
                      <th>Avg. Satisfaction</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.productBreakdown && dashboardData.productBreakdown.map((product, index) => (
                      <tr key={index}>
                        <td>{product.product}</td>
                        <td>{formatNumber(product.count)}</td>
                        <td>{formatRating(product.satisfaction)}</td>
                        <td>
                          <span className={`text-${product.satisfaction >= 4.0 ? 'success' : product.satisfaction < 3.5 ? 'danger' : 'warning'}`}>
                            {getTrendIcon(product.satisfaction)} {getTrendText(product.satisfaction)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage; 