import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function SalesDisplay() {
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSales() {
      try {
        const res = await api.get('/sales');
        setSales(res.data);
      } catch (err) {
        console.error('Error fetching sales:', err);
      }
    }
    fetchSales();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSales = sales.filter((s) =>
    Object.values(s).some((val) =>
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
        <Sidebar active="Sales" onSelect={handleSidebarSelect} />
        <div className="dashboard-content">
          <h2 className="products-title">Sales</h2>
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
          <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Product ID</th>
                <th>Store ID</th>
                <th>Units Sold</th>
                <th>Sales Revenue</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((s, i) => (
                <tr key={i}>
                  <td>{s.transaction_id}</td>
                  <td>{s.date}</td>
                  <td>{s.product_id}</td>
                  <td>{s.store_id}</td>
                  <td>{s.units_sold}</td>
                  <td>{s.sales_revenue}</td>
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

export default SalesDisplay;
