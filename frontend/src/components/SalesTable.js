import React, { useEffect, useState } from 'react';
import api from '../services/api';

function SalesTable() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/sales');
        setSales(res.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h3>Sales Transactions</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Product ID</th>
            <th>Store</th>
            <th>Date</th>
            <th>Units</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s, idx) => (
            <tr key={idx}>
              <td>{s.transaction_id}</td>
              <td>{s.product_id}</td>
              <td>{s.store_id}</td>
              <td>{s.date}</td>
              <td>{s.units_sold}</td>
              <td>{s.sales_revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesTable;
