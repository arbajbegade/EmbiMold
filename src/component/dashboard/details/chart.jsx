import React from 'react';
import Chart from 'react-apexcharts';

const DataChart = ({ rejectionHistory, prodHistory }) => {
  const currentHour = new Date().getHours();

  // Reorder the hours to have the current hour at the end
  const reorderedHours = [
    ...Array.from({ length: 24 - currentHour - 1 }, (_, i) => currentHour + 1 + i),
    ...Array.from({ length: currentHour + 1 }, (_, i) => i)
  ];

  const prodData = reorderedHours.map(hour => prodHistory[hour] || 0);
  const rejectData = reorderedHours.map(hour => rejectionHistory[hour] || 0);
  const hourLabels = reorderedHours.map(hour => `${hour}:00`);

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: false, // Now it's NOT stacked
      toolbar: { show: false },
    },
    xaxis: {
      categories: hourLabels,
      labels: { rotate: -45 }
    },
    yaxis: {
      title: { text: 'Count' }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        endingShape: 'rounded'
      },
    },
    colors: ['#00E396', '#FF4560'],
    legend: {
      position: 'top'
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const chartSeries = [
    {
      name: 'Production',
      data: prodData
    },
    {
      name: 'Rejection',
      data: rejectData
    }
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
    </div>
  );
};

export default DataChart;
