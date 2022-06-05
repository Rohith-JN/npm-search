import React, { useEffect, useState } from 'react';
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
import './lineChart.scss';
import Error from '../error_page/Error';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart({ input }) {
  const options = {
    bezierCurve: true,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Downloads last week',
      },
    },
  };

  const data = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        lineTension: 0.4,
      },
    ],
  };

  const [chartData, setChartData] = useState({
    labels: [],
    data: [],
  });
  const [error, setError] = useState({
    error: false,
    errorMessage: '',
    errorCode: '',
  });

  const fetchPackageInfo = async (input) => {
    const response = await fetch(
      `https://api.npmjs.org/downloads/range/last-week/${input}`
    );
    const data = await response.json();
    setChartData({
      labels: data.downloads.map((item) => item.day),
      data: data.downloads.map((item) => item.downloads),
    });
    if (response.status === 200) {
      setError({ error: false });
    } else if (response.status !== 200) {
      setError({
        error: true,
        errorMessage: data.message,
        errorCode: response.status,
      });
    } else {
      setError({ error: true });
    }
  };

  useEffect(() => {
    fetchPackageInfo(input);
  }, [input]);

  data.labels = chartData.labels;
  data.datasets[0].data = chartData.data;
  data.datasets[0].label = input;

  return (
    <div className="LineChart" id="LineChart">
      {error.error ? (
        <Error errorCode={error.errorCode} errorMessage={error.errorMessage} />
      ) : (
        <Line options={options} data={data} />
      )}
    </div>
  );
}
