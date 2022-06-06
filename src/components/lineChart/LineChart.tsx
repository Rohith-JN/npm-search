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

interface LineChartProps {
  input: string;
}

const LineChart:FC<LineChartProps> = ({ input }) => {
  const options:any = {
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
    labels: [] as any[],
    datasets: [
      {
        label: '',
        data: [] as any [],
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
    errorCode: 200,
  });

  const fetchPackageInfo = async (input: string) => {
    const response = await fetch(
      `https://api.npmjs.org/downloads/range/last-week/${input}`
    );
    const data = await response.json();
    setChartData({
      labels: data.downloads.map((item: any) => item.day),
      data: data.downloads.map((item: any) => item.downloads),
    });
    if (response.status === 200) {
      setError({ error: false, errorMessage: '', errorCode: 200 });
    } else if (response.status !== 200) {
      setError({
        error: true,
        errorMessage: data.message,
        errorCode: response.status,
      });
    } else {
      setError({ error: true,
        errorMessage: data.message,
        errorCode: response.status, });
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

export default LineChart;