import React from 'react';
import Chart from "react-apexcharts";

const DashboardChart = ({ prodHistory, rejectionHistory }) => {
    const currentHour = new Date().getHours();

    const full24Hours = [
        ...Array.from({ length: 24 - currentHour - 1 }, (_, i) => currentHour + 1 + i),
        ...Array.from({ length: currentHour + 1 }, (_, i) => i)
    ];

    const past8Hours = full24Hours.slice(-8);

    const prodData = past8Hours.map(hour => prodHistory[hour] || 0);
    const rejectData = past8Hours.map(hour => rejectionHistory[hour] || 0);
    const hourLabels = past8Hours.map(hour => `${hour}`);
    const chartOptions = {
        chart: {
            type: 'bar',
            height: 170,
            stacked: true, // Now it's NOT stacked
            toolbar: { show: false },
        },
        xaxis: {
            categories: hourLabels,
            labels: { rotate: -45 }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '25%',
                endingShape: 'rounded'
            },
        },
        colors: ['#00E396', '#FF4560'],
        legend: {
            position: 'bottom'
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
        <div>
            <Chart options={chartOptions} series={chartSeries} type="bar" height={140} />
        </div>
    );
};

export default DashboardChart;
