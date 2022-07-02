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
      ticks: { color: 'gray' },
      grid: {
        color: 'transparent',
        borderColor: 'gray',
      }
    },
    y: {
      ticks: { color: 'gray' },
      grid: {
        color: 'transparent',
        borderColor: 'gray',
      }
    }
  }
};

export default options;