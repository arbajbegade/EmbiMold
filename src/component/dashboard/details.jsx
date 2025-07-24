import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';

const DashBoardDetails = ({ allDetails }) => {
  const navigate = useNavigate();

  const handleCardClick = (machineId) => {
    navigate(`/details/${machineId}`)
  };
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "running":
        return "bg-green-700";
      case "offline":
        return "bg-red-700";
      case "idle":
        return "bg-yellow-500";
      case "error":
        return "bg-orange-600";
      case "maintenance":
        return "bg-blue-700";
      default:
        return "bg-gray-500"; // fallback color
    }
  };
  const renderProgressBar = (target, actual, rejected) => {
    const total = Number(target);
    const actualPercent = Math.min((actual / total) * 100, 100);
    const rejectedPercent = Math.min((rejected / total) * 100, 100);
    const remainingPercent = Math.max(100 - actualPercent - rejectedPercent, 0);

    return (
      <div className="w-full space-y-1">
        {/* Labels above the bar */}
        <div className="w-full flex text-xs text-gray-700 font-medium">
          <div className="text-left" style={{ width: `${rejectedPercent}%` }}>
            {`${rejected}`}
          </div>
          <div className="text-right w-full">
            {`${target}`}
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full h-3 rounded flex overflow-hidden shadow-inner">
          <div className="bg-[#EF4444] h-full" style={{ width: `${rejectedPercent}%` }} />
          <div className="bg-[#3B82F6] h-full" style={{ width: `${actualPercent}%` }} />
          <div className="bg-[#D1D5DB] h-full" style={{ width: `${remainingPercent}%` }} />
        </div>

        {/* Labels below the bar */}
        <div className="w-full flex text-xs text-gray-700 font-medium">
          <div className="text-center" style={{ width: `${actualPercent}%` }}>
            {`${actual}`}
          </div>
        </div>

      </div>
    );
  };



  return (
    <div className="font-bold text-xl">
      <div className="flex flex-wrap justify-center gap-6">
        {allDetails.map((data, index) => {
          const statusColor = getStatusColor(data["status"]);

          return (
            <div key={index} onClick={() => handleCardClick(data["machine name"])} className="text-white rounded-xl shadow-lg w-64 cursor-pointer hover:scale-105 hover:shadow-xl transition-transform duration-200">
              <div className={`${statusColor} py-2 rounded-t-xl text-center`}>
                {data["machine name"] || "Unknown"}
              </div>
              <div className='bg-gray-100'>
                <div className="text-black p-4 rounded-b-xl text-sm space-y-3">
                  <p>PS Number: {data["ps number"]}</p>
                  <div className='p-2'>
                    {renderProgressBar(data.target, data.actual, data.rejected)}
                  </div>
                  <p>Machine Status: {data.status}</p>
                  <p>Connection Status: {data["connection status"]}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashBoardDetails;
