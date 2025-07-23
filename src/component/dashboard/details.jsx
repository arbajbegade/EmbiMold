import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';

const DashBoardDetails = () => {
  const navigate = useNavigate();

   const machines = [
    {
      id: 1,
      name: "Machine 1",
      qunatity: 150,
      process: "Molding",
      status: "Running",
      shiftTimings: [20, 35, 50]
    },
    {
      id: 2,
      name: "Machine 1",
      qunatity: 300,
      process: "Molding",
      status: "Running",
      shiftTimings: [50, 40, 60]
    },
    {
      id: 3,
      name: "Machine 1",
      qunatity: 150,
      process: "Molding",
      status: "Running",
      shiftTimings: [30, 30, 30]
    },
    {
      id: 4,
      name: "Machine 1",
      qunatity: 250,
      process: "Molding",
      status: "Running",
      shiftTimings: [60, 70, 50]
    },
    {
      id: 5,
      name: "Machine 1",
      qunatity: 90,
      process: "Molding",
      status: "Running",
      shiftTimings: [25, 40, 30]
    },
    {
      id: 6,
      name: "Machine 1",
      qunatity: 200,
      process: "Molding",
      status: "Running",
      shiftTimings: [45, 55, 70]
    },
  ];

  const handleCardClick = (machineId) => {
    navigate(`/details/${machineId}`)
  };

  const getProgressColor = (qty) => {
    if (qty < 100) return 'bg-green-500';
    if (qty <= 200) return 'bg-red-500';
    return 'bg-white border border-gray-300';
  };

  return (
    <div className="font-bold text-xl">
      <div className="flex flex-wrap justify-center gap-6">
        {machines.map((machine) => (
          <div
            key={machine.id}
            onClick={() => handleCardClick(machine.id)}
            className="text-white rounded-xl shadow-lg w-64 cursor-pointer hover:scale-105 hover:shadow-xl transition-transform duration-200"
          >
            <div className="bg-red-700 py-2 rounded-t-xl text-center">
              {machine.name}
            </div>
            <div className="bg-gray-200 text-black p-4 rounded-b-xl text-sm space-y-3">
              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="font-semibold text-center">Status: {machine.status}</div>
                <div className="w-full bg-gray-300 h-3 rounded">
                  <div
                    className={`h-3 rounded ${getProgressColor(machine.qunatity)}`}
                    style={{ width: `${Math.min(machine.qunatity / 3, 100)}%` }}
                  ></div>
                </div>
                <div className="text-center text-xs font-medium">Quantity: {machine.qunatity}</div>
              </div>

              {/* Shift Timing Bar Chart */}
              <div>
                <Chart
                  type="bar"
                  height={150}
                  series={[{ name: 'Shift Output', data: machine.shiftTimings }]}
                  options={{
                    chart: {
                      toolbar: { show: false },
                      animations: { enabled: true }
                    },
                    xaxis: {
                      categories: ['Shift 1', 'Shift 2', 'Shift 3'],
                      labels: { style: { fontSize: '10px' } }
                    },
                    yaxis: {
                      labels: { style: { fontSize: '10px' } }
                    },
                    plotOptions: {
                      bar: { borderRadius: 4, columnWidth: '50%' }
                    },
                    colors: ['#3182CE']
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoardDetails;
