// src/pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';
import bgImage from '../styles/bg-image.webp';

function Dashboard() {
  const navigate = useNavigate();

  const handleSidebarSelect = (selected) => {
    switch (selected) {
      case 'Dashboard':
        navigate('/');
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
      <div
        className="main"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      >
        <Sidebar active="Dashboard" onSelect={handleSidebarSelect} />
        <div className="dashboard-content center-content">
          <div className="button-group">
            <button className="big-btn" onClick={() => navigate('/category')}>
              Predict Category-Wise
            </button>
            <button className="big-btn" onClick={() => navigate('/product')}>
              Predict Product-Wise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
