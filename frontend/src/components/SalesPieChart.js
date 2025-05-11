// src/components/SalesPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function SalesPieChart({ chartData }) {
  const totalActual = chartData.reduce((sum, row) => sum + row.actual, 0);
  const totalPredicted = chartData.reduce((sum, row) => sum + row.predicted, 0);

  const data = {
    labels: ['Actual Sales', 'Predicted Sales'],
    datasets: [
      {
        data: [totalActual, totalPredicted],
        backgroundColor: [
          'rgba(0, 102, 204, 0.7)',
          'rgba(0, 204, 102, 0.7)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 13,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return <Pie data={data} options={options} />;
}

export default SalesPieChart;
