import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function PromotionsDisplay() {
  const [promotions, setPromotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPromotions() {
      try {
        const res = await api.get('/promotions');
        setPromotions(res.data);
      } catch (err) {
        console.error('Error fetching promotions:', err);
      }
    }
    fetchPromotions();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filtered = promotions.filter((item) =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSidebarSelect = (selected) => {
    switch (selected) {
      case 'Dashboard': navigate('/'); break;
      case 'Products': navigate('/products'); break;
      case 'Sales': navigate('/sales'); break;
      case 'Promotions': navigate('/promotions'); break;
      case 'Holidays': navigate('/holidays'); break;
      default: break;
    }
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main">
        <Sidebar active="Promotions" onSelect={handleSidebarSelect} />
        <div className="dashboard-content">
          <h2 className="products-title">Promotions</h2>
          <div className="search-bar-wrapper">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search here"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="predict-btn">Search</button>
            </div>
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Promotion ID</th>
                  <th>Product ID</th>
                  <th>Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Discount (%)</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={i}>
                    <td>{p.promotion_id}</td>
                    <td>{p.product_id}</td>
                    <td>{p.promotion_type}</td>
                    <td>{p.start_date}</td>
                    <td>{p.end_date}</td>
                    <td>{p.discount_percent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromotionsDisplay;
