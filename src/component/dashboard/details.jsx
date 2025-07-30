import { useNavigate } from "react-router-dom";
import RenderProgressBar from "../ui/RenderProgressBar";
import DashboardChart from "./DashboardChart";

const DashBoardDetails = ({ allDetails }) => {
  const navigate = useNavigate();
  const handleCardClick = (machineId) => {
    navigate(`/details/${machineId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "bg-green-700";
      case 0:
        return "bg-red-700";
      case 'running':
        return "bg-green-700";
      case 'offline':
        return "bg-red-700";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <div className="font-bold text-xl">
      <div className="flex flex-wrap justify-center gap-6">
        {allDetails.map((data, index) => {
          const statusColor = getStatusColor(data.connection_status);
          return (
            <div key={index} onClick={() => handleCardClick(data["machine name"])} className="text-white rounded-xl shadow-lg w-64 cursor-pointer hover:scale-105 hover:shadow-xl transition-transform duration-200">
              <div className={`${statusColor} py-2 rounded-t-xl text-center`}>
                {data["machine name"] || "Unknown"}
              </div>
              <div className={`${data.status === 'Running' ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="text-black px-1 rounded-b-xl text-sm text-center space-y-">
                  <p>PS Number: {data["ps number"]}</p>
                  <div className="px-2">
                    <RenderProgressBar target={data.target} actual={data.actual} rejected={data.rejected} />
                    <RenderProgressBar target={data.shift_target} actual={data.shift_actual} rejected={data.shift_rejected} />
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="px-2 text-black -mt-3">
                  <DashboardChart prodHistory={data.prod_history} rejectionHistory={data.rejection_history} />
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
