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
import styles from '../styles/MonthChart.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthChartProps {
  input: string;
}

const MonthChart: FC<MonthChartProps> = ({ input }) => {
  const options: any = {
    bezierCurve: true,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Downloads last month',
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

  const fetchPackageInfo = async (input: string) => {
    const response = await fetch(
      `https://api.npmjs.org/downloads/range/last-month/${input}`
    );
    const data = await response.json();
    setChartData({
      labels: data.downloads.map((item: any) => String(item.day).slice(-2)),
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
      setError({
        error: true,
        errorMessage: data.message,
        errorCode: response.status,
      });
    }
  };

  useEffect(() => {
    fetchPackageInfo(input);
  }, [input]);

  data.labels = chartData.labels;
  data.datasets[0].data = chartData.data;
  data.datasets[0].label = input;

  return (
    <div className={styles.MonthChart} id="MonthChart">
      {error.error ? (
        <article className={styles.content}>
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

export default MonthChart;