// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

function Sidebar({ active, onSelect = () => {} }) {
  const buttons = ["Dashboard", "Products", "Sales", "Promotions", "Holidays"];
  return (
    <div className="sidebar">
      {buttons.map((btn) => (
        <button
          key={btn}
          className={active === btn ? 'active' : ''}
          onClick={() => onSelect(btn)}
        >
          {btn}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
