import { useNavigate } from "react-router-dom";
import RenderProgressBar from "../ui/RenderProgressBar";
import DashboardChart from "./DashboardChart";

const DashBoardDetails = ({ allDetails }) => {
  const navigate = useNavigate();
console.log('allDetails',allDetails)
  const handleCardClick = (machineId) => {
    navigate(`/details/${machineId}`);
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
        return "bg-gray-500";
    }
  };

  return (
    <div className="font-bold text-xl">
      <div className="flex flex-wrap justify-center gap-6">
        {allDetails.map((data, index) => {
          const statusColor = getStatusColor(data["status"]);

          return (
            <div
              key={index}
              onClick={() => handleCardClick(data["machine name"])}
              className="text-white rounded-xl shadow-lg w-64 cursor-pointer hover:scale-105 hover:shadow-xl transition-transform duration-200"
            >
              <div className={`${statusColor} py-2 rounded-t-xl text-center`}>
                {data["machine name"] || "Unknown"}
              </div>
              <div className="bg-gray-100">
                <div className="text-black p-4 rounded-b-xl text-sm space-y-3">
                  <p>PS Number: {data["ps number"]}</p>
                  <div className="p-2">
                    <RenderProgressBar target={data.target} actual={data.actual} rejected={data.rejected} />
                    <RenderProgressBar target={data.shift_target} actual={data.shift_actual} rejected={data.shift_rejected} />
                  </div>
                  <p>Machine Status: {data.status}</p>
                  <p>Connection Status: {data.connection_status}</p>
                </div>

                {/* Bar Chart */}
                <div className="px-2 text-black">
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
