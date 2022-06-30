import React, { useEffect, useState, FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from 'next-themes';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ chartLabels, chartData, input } : { chartLabels: Array<number>, chartData: Array<number>, input: any }) => {
  const { theme, setTheme } = useTheme()
  const [darkMode, setDarkMode] = useState(theme === 'light' ? true : false);
  const options: any = {
    bezierCurve: true,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        display: true,
        labels: {
          usePointStyle: true,
        }
      },
      title: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          color: 'transparent',
          borderColor: darkMode ? '#6b7280' : 'white',
        }
      },
      y: {
        grid: {
          color: 'transparent',
          borderColor: darkMode ? '#6b7280' : 'white',
        }
      }
    }
  };

  const data = {
    labels: [] as any[],
    datasets: [
      {
        label: '',
        data: [] as any[],
        pointRadius: 0,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: '#1e88e5',
        lineTension: 0.4,
      },
    ],
  };

  data.labels = chartLabels;
  data.datasets[0].data = chartData;
  data.datasets[0].label = input;

  return (
    <div>
      <div className="w-5/6 h-96">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default Chart;