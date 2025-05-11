// src/pages/ProductPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ProductForm from '../components/ProductForm';
import SalesBarChart from '../components/SalesBarChart';
import SalesPieChart from '../components/SalesPieChart';
import api from '../services/api';
import './Dashboard.css';

function ProductPage() {
  const [prediction, setPrediction] = useState(null);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/chart-data-product');
        setChartData(res.data);
      } catch (err) {
        console.error('Failed to fetch product chart data:', err);
      }
    }
    fetchData();
  }, []);

  const handleSidebarSelect = (selected) => {
    switch (selected) {
      case 'Dashboard':
        navigate('/');
        break;
      case 'Product':
        navigate('/product');
        break;
      case 'Category':
        navigate('/category');
        break;
      case 'Products':
        navigate('/products');
        break;
      case 'Sales':
        navigate('/sales');
        break;
      case 'Promotions':
        navigate('/promotions');
        break;
      case 'Holidays':
        navigate('/holidays');
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main">
        <Sidebar active="Product" onSelect={handleSidebarSelect} />
        <div className="dashboard-content">
          <h2>Product-Wise Prediction</h2>
          <ProductForm 
            onPrediction={setPrediction} 
            onFuturePrediction={setChartData} 
          />
          {prediction !== null && (
            <div className="predict-row">
              <p><strong>Predicted Unit Sold:</strong> {prediction}</p>
            </div>
          )}
          <h2>Actual vs Predicted Sales</h2>
          <div className="chart-row">
            <div className="chart-bar">
              <SalesBarChart chartData={chartData} />
            </div>
            <div className="chart-pie">
              <SalesPieChart chartData={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
