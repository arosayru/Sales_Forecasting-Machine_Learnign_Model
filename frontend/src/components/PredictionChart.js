import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './PredictionChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function PredictionChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/prediction-chart');
        const data = res.data;

        if (Array.isArray(data) && data.length > 0) {
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

          const labels = data.map(row => {
            const [year, month] = row.date.split('-');
            return `${monthNames[parseInt(month) - 1]} ${year}`;
          });

          const actualSales = data.map(row => row.actual || 0);
          const predictedSales = data.map(row => row.predicted || 0);

          setChartData({
            labels,
            datasets: [
              {
                label: 'Actual Sales',
                data: actualSales,
                backgroundColor: 'rgba(0, 102, 204, 0.7)', // blue
              },
              {
                label: 'Predicted Sales',
                data: predictedSales,
                backgroundColor: 'rgba(0, 204, 102, 0.7)', // green
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    }

    fetchData();
  }, []);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div className="chart-container">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#000',
                font: {
                  size: 13,
                  weight: 'bold',
                },
              },
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          scales: {
            x: {
              ticks: {
                color: '#000',
                maxRotation: 60,
                minRotation: 45,
              },
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: '#000',
              },
              grid: {
                color: '#ddd',
              },
            },
          },
        }}
      />
    </div>
  );
}

export default PredictionChart;
