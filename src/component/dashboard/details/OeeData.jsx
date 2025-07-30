import Chart from 'react-apexcharts';

const RadialChart = ({ title, percentage, color }) => {
    const chartOptions = {
        chart: {
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '50%',
                },
                dataLabels: {
                    name: {
                        show: false, // Hide name to avoid crowding
                    },
                    value: {
                        show: true,
                        fontSize: '14px',
                        fontWeight: 600,
                        offsetY: 0, // Center vertically
                        formatter: (val) => `${val}%`,
                    },
                },
            },
        },
        labels: [title],
        colors: [color],
    };

    const chartSeries = [percentage];

    return (
        <div className="w-36">
            <Chart options={chartOptions} series={chartSeries} type="radialBar" height={120} />
            <p className="text-center text-xs">{title}</p>
        </div>
    );
};

const OeeData = ({ data }) => {
    if (!data) return <div className="text-red-500">No OEE data available</div>;

    const { availability, performance, quality, overall } = data;

    const metrics = [
        { title: 'Availability', percentage: availability?.percentage || 0, color: '#00E396' },
        { title: 'Performance', percentage: performance?.percentage || 0, color: '#FEB019' },
        { title: 'Quality', percentage: quality?.percentage || 0, color: '#FF4560' },
        { title: 'Overall', percentage: overall?.percentage || 0, color: '#775DD0' },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-1">
            {metrics.map((metric, idx) => (
                <RadialChart
                    key={idx}
                    title={metric.title}
                    percentage={metric.percentage}
                    color={metric.color}
                />
            ))}
        </div>
    );
};

export default OeeData;
