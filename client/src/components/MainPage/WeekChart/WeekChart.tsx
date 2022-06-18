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
import './WeekChart.scss';
import { fetchWeekChart } from '../../../services/services';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeekChartProps {
  input: string;
}

const WeekChart: FC<WeekChartProps> = ({ input }) => {
  const options: any = {
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
        data: [] as any[],
        pointRadius: 0,
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

  useEffect(() => {
    fetchWeekChart({input, setError, setChartData});
  }, [input]);

  data.labels = chartData.labels;
  data.datasets[0].data = chartData.data;
  data.datasets[0].label = input;

  return (
    <div className="WeekChart" id="WeekChart">
      {error.error ? (
        <article className="content">
          <p>
            <strong>Error ({error.errorCode})</strong>
          </p>
          <p>{error.errorMessage}</p>
        </article>
      ) : (
        <Line options={options} data={data} />
      )}
    </div>
  );
}

export default WeekChart;