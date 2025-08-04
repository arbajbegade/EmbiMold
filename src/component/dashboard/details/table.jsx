import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import OeeData from './OeeData';
import SettingsIcon from '@mui/icons-material/Settings';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import BoltIcon from '@mui/icons-material/Bolt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RestrictedComponent from '../../../permissions/RestrictedComponent';

const DetailsTable = ({ data, moldStatus }) => {
  if (!data || Object.keys(data).length === 0) return <p className="text-red-500">No data available</p>;

  const dataList = [
    { name: "Ps No", quantity: data?.mold?.ps_no || "N/A", process: "Cavity", time: data?.mold?.cavities ?? "N/A" },
    { name: "Loading Time", quantity: data?.mold?.loading_time ?? "N/A", process: "Working Cavity", time: data?.mold?.working_cavities ?? "N/A" },
    { name: "Cycle Time", quantity: data?.mold?.cycle_time ?? "N/A", process: "Mold Temperature", time: data?.mold?.mold_temperature ?? "N/A" },
    { name: "Shift Target", quantity: data?.production?.target?.shift_target ?? "N/A", process: "Month Target", time: data?.production?.target?.plan_target ?? "N/A" },
    { name: "Shift Actual", quantity: data?.production?.actual?.shift_actual ?? "N/A", process: "Month Actual", time: data?.production?.actual?.plan_actual ?? "N/A" },
    { name: "Shift Rejected", quantity: data?.production?.rejected?.shift_rejected ?? "N/A", process: "Month Rejected", time: data?.production?.rejected?.plan_rejected ?? "N/A" },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full gap-6">

      <div className="md:w-1/2 w-full">
        <div className="overflow-hidden rounded-lg shadow-lg border border-gray-200">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3 border-r">Label</th>
                <th className="px-4 py-3 border-r">Value</th>
                <th className="px-4 py-3 border-r">Process</th>
                <th className="px-4 py-3">Value</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 border-r text-gray-800">{row.name}</td>
                  <td className="px-4 py-2 border-r text-slate-800 font-medium">{row.quantity}</td>
                  <td className="px-4 py-2 border-r text-gray-700">{row.process}</td>
                  <td className="px-4 py-2 text-slate-800 font-medium">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:w-1/2 w-full flex flex-col justify-between p-4 border border-gray-200 rounded-lg shadow-lg bg-white space-y-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-gray-700">Mold:</span>
            {moldStatus === 'OPEN' ? (
              <span className="text-yellow-600 flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                <HourglassEmptyIcon fontSize="small" />
                OPEN
              </span>
            ) : (
              <span className="text-green-600 flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                <BuildCircleIcon fontSize="small" />
                CLOSED
              </span>
            )}
          </div>
          <div className="text-sm font-medium flex items-center gap-2">
            <span className="text-gray-700">Electricity:</span>
            {data?.electricity?.status?.status === 'OK' ? (
              <span className="text-green-600 flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                <BoltIcon fontSize="small" />
                OK
              </span>
            ) : data?.electricity?.status?.status === 'FAULT' ? (
              <span className="text-red-600 flex items-center gap-1 bg-red-100 px-2 py-1 rounded-full">
                <ErrorOutlineIcon fontSize="small" />
                FAULT
              </span>
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </div>
          <div className="text-sm font-medium flex items-center gap-2">
            <span className="text-gray-700">Mode:</span>
            {data?.machine?.mode?.mode === 'AUTO' ? (
              <span className="text-green-600 flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                <SettingsIcon fontSize="small" />
                AUTO
              </span>
            ) : data?.machine?.mode?.mode === 'MANUAL' ? (
              <span className="text-yellow-600 flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                <PanToolAltIcon fontSize="small" />
                MANUAL
              </span>
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </div>

          {data?.machine?.status?.status ? (
            <div className="text-sm font-medium flex items-center gap-2">
              <span className="text-gray-700">Status:</span>
              <div className="flex items-center gap-1">
                {data.machine.status.status === 'Cycle Start' && (
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    <AutorenewIcon fontSize="small" />
                    <span>{data.machine.status.status}</span>
                  </div>
                )}

                {data.machine.status.status === 'Loading' && (
                  <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                    <HourglassEmptyIcon fontSize="small" />
                    <span>{data.machine.status.status}</span>
                  </div>
                )}

                {data.machine.status.status !== 'Cycle Start' &&
                  data.machine.status.status !== 'Loading' && (
                    <div className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      <HelpOutlineIcon fontSize="small" />
                      <span>{data.machine.status.status}</span>
                    </div>
                  )}
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 italic">Status: Not Available</div>
          )}


        </div>

        <div>
          <RestrictedComponent roles={['embedsol']}>
            <OeeData data={data?.OEE || {}} />
          </RestrictedComponent>
        </div>
      </div>
    </div>
  );
};

export default DetailsTable;
