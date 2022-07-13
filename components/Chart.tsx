import React, { useState } from 'react';
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

const Chart = ({ chartLabels, chartData, input }: { chartLabels: Array<number>, chartData: Array<number>, input: any }) => {

  const data = {
    labels: [] as any[],
    datasets: [
      {
        label: '',
        data: [] as any[],
        fill: true,
        backgroundColor: '#1e88e5',
        borderColor: '#1e88e5',
        lineTension: 0.4,
      },
    ],
  };

  const { theme, setTheme } = useTheme()

  const options: any = {
    tooltips: {
      enabled: true,
      mode: "label"
    },
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
        ticks: { color: 'gray' },
        grid: {
          color: theme === 'light' ? '#E4E0E3' : '#2D3033',
          borderColor: 'gray',
        }
      },
      y: {
        ticks: { color: 'gray' },
        grid: {
          color: theme === 'light' ? '#E4E0E3' : '#2D3033',
          borderColor: 'gray',
        }
      }
    }
  };

  data.labels = chartLabels;
  data.datasets[0].data = chartData;
  data.datasets[0].label = input;

  return (
    <div>
      <div className="w-5/6 h-96 lg:w-full lg:pr-4">
        <p className='text-2xl mb-6'>Downloads in the past 1 week</p>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default Chart;