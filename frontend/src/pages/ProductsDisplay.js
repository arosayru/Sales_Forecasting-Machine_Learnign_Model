import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function ProductDisplay() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    }
    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((p) =>
    Object.values(p).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSidebarSelect = (selected) => {
    switch (selected) {
      case 'Dashboard': navigate('/'); break;
      case 'Products': navigate('/products'); break;
      case 'Sales': navigate('/sales'); break;
      case 'Promotions': /* navigate to promotions if needed */ break;
      case 'Holidays': /* navigate to holidays if needed */ break;
      default: break;
    }
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main">
        <Sidebar active="Products" onSelect={handleSidebarSelect} />
        <div className="dashboard-content">
          <h2 className="products-title">Products</h2>
          <div className="search-bar-wrapper">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search here"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                  padding: '8px',
                  fontSize: '1rem',
                  width: '250px',
                  marginRight: '10px',
                }}
              />
              <button className="predict-btn">Search</button>
            </div>
          </div>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p, i) => (
                <tr key={i}>
                  <td>{p.product_id}</td>
                  <td>{p.product_name}</td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductDisplay;
