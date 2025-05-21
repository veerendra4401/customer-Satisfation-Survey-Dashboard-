import React, { useState, useEffect } from 'react';
import surveyApi from '../../services/api';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(false);

  // Product data from API
  const [products, setProducts] = useState([]);
  
  // Sample survey data
  const surveys = [
    { id: 1, name: 'General Satisfaction Survey', questions: 8, responses: 752, lastModified: '2023-05-10' },
    { id: 2, name: 'Product A Usability Survey', questions: 12, responses: 304, lastModified: '2023-04-22' },
    { id: 3, name: 'Customer Support Feedback', questions: 6, responses: 198, lastModified: '2023-05-15' },
  ];

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    active: true,
  });

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await surveyApi.getProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handler functions
  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await surveyApi.createProduct(newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ name: '', category: '', active: true });
      setLoading(false);
    } catch (error) {
      console.error('Error creating product:', error);
      setLoading(false);
    }
  };

  const toggleProductStatus = async (id) => {
    try {
      const productToUpdate = products.find(p => p.id === id);
      if (!productToUpdate) return;
      
      const updatedProduct = { 
        ...productToUpdate, 
        active: !productToUpdate.active 
      };
      
      setLoading(true);
      await surveyApi.updateProduct(id, updatedProduct);
      
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, active: !product.active } : product
        )
      );
      setLoading(false);
    } catch (error) {
      console.error('Error updating product:', error);
      setLoading(false);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }
    
    try {
      setLoading(true);
      console.log(`Attempting to delete product with ID: ${id}`);
      
      // Debug: log the exact request we're about to make
      console.log(`DELETE request to: ${surveyApi?.defaults?.baseURL || 'http://localhost:8080/api'}/products/${id}`);
      
      const response = await surveyApi.deleteProduct(id);
      console.log('Delete response:', response);
      
      // Remove the product from the state
      setProducts(products.filter(product => product.id !== id));
      setLoading(false);
      
      // Show success message
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      
      // Log detailed error information
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something else happened
        console.error('Error message:', error.message);
      }
      
      setLoading(false);
      alert(`Failed to delete product: ${error.response?.data?.message || error.message || 'Unknown error'}`);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'surveys' ? 'active' : ''}`}
            onClick={() => setActiveTab('surveys')}
          >
            Surveys
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
        </li>
      </ul>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <div className="row">
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Manage Products</h5>
                </div>
                <div className="card-body">
                  {loading ? (
                    <div className="d-flex justify-content-center my-5">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product.id}>
                              <td>{product.id}</td>
                              <td>{product.name}</td>
                              <td>{product.category}</td>
                              <td>
                                <span className={`badge ${product.active ? 'bg-success' : 'bg-danger'}`}>
                                  {product.active ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm btn-outline-primary me-2"
                                  onClick={() => toggleProductStatus(product.id)}
                                >
                                  {product.active ? 'Deactivate' : 'Activate'}
                                </button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteProduct(product.id)}>
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Add New Product</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleAddProduct}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={newProduct.name}
                        onChange={handleProductChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">Category</label>
                      <select
                        className="form-select"
                        id="category"
                        name="category"
                        value={newProduct.category}
                        onChange={handleProductChange}
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Home Appliances">Home Appliances</option>
                        <option value="Audio">Audio</option>
                        <option value="Software">Software</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Service">Service</option>
                      </select>
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="active"
                        name="active"
                        checked={newProduct.active}
                        onChange={handleProductChange}
                      />
                      <label className="form-check-label" htmlFor="active">Active</label>
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Adding...
                        </>
                      ) : 'Add Product'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Surveys Tab */}
      {activeTab === 'surveys' && (
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Manage Surveys</h5>
            <button className="btn btn-primary btn-sm">Create New Survey</button>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Survey Name</th>
                    <th>Questions</th>
                    <th>Responses</th>
                    <th>Last Modified</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {surveys.map((survey) => (
                    <tr key={survey.id}>
                      <td>{survey.id}</td>
                      <td>{survey.name}</td>
                      <td>{survey.questions}</td>
                      <td>{survey.responses}</td>
                      <td>{survey.lastModified}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => window.alert('Survey deletion is not implemented yet')}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Reports</h5>
          </div>
          <div className="card-body">
            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Monthly Satisfaction Summary</h5>
                  <small className="text-muted">PDF</small>
                </div>
                <p className="mb-1">
                  Overview of customer satisfaction metrics across all products for the current month.
                </p>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Quarterly Product Comparison</h5>
                  <small className="text-muted">Excel</small>
                </div>
                <p className="mb-1">
                  Detailed comparison of different products and their satisfaction scores over the last quarter.
                </p>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Annual Satisfaction Trends</h5>
                  <small className="text-muted">PDF</small>
                </div>
                <p className="mb-1">
                  Analysis of satisfaction trends over the past year with month-by-month breakdown.
                </p>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage; 