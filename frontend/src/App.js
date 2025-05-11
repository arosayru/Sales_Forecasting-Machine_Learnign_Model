import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import ProductsDisplay from './pages/ProductsDisplay'; 
import SalesDisplay from './pages/SalesDisplay';
import PromotionsDisplay from './pages/PromotionsDisplay';
import HolidaysDisplay from './pages/HolidaysDisplay';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/products" element={<ProductsDisplay />} /> 
        <Route path="/sales" element={<SalesDisplay />} />
        <Route path="/promotions" element={<PromotionsDisplay />} />
        <Route path="/holidays" element={<HolidaysDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
