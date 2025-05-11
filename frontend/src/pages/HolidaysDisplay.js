// src/pages/HolidaysDisplay.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function HolidaysDisplay() {
  const [holidays, setHolidays] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHolidays() {
      try {
        const res = await api.get('/holidays');
        setHolidays(res.data);
      } catch (err) {
        console.error('Error fetching holidays:', err);
      }
    }
    fetchHolidays();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filtered = holidays.filter((item) =>
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
        <Sidebar active="Holidays" onSelect={handleSidebarSelect} />
        <div className="dashboard-content">
          <h2 className="products-title">Holidays</h2>
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
                  <th>Holiday Name</th>
                  <th>Date</th>
                  <th>Region</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((h, i) => (
                  <tr key={i}>
                    <td>{h.holiday_name}</td>
                    <td>{h.date}</td>
                    <td>{h.region}</td>
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

export default HolidaysDisplay;
