// src/components/SalesBarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function SalesBarChart({ chartData }) {
  // ✅ Define correct month order
  const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // ✅ Sort chartData by month order
  const sortedData = [...chartData].sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  );

  // ✅ Check if actual/predicted data exist
  const hasActual = sortedData.some(row => row.actual > 0);
  const hasPredicted = sortedData.some(row => row.predicted > 0);

  // ✅ Prepare datasets
  const datasets = [];
  if (hasActual) {
    datasets.push({
      label: 'Actual Sales',
      data: sortedData.map(row => row.actual),
      backgroundColor: 'rgba(0, 102, 204, 0.7)',
    });
  }
  if (hasPredicted) {
    datasets.push({
      label: 'Predicted Sales',
      data: sortedData.map(row => row.predicted),
      backgroundColor: 'rgba(0, 204, 102, 0.7)',
    });
  }

  // ✅ Configure data and options
  const data = {
    labels: sortedData.map(row => row.month),
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { color: '#eee' } },
    },
  };

  return <Bar data={data} options={options} />;
}

export default SalesBarChart;
