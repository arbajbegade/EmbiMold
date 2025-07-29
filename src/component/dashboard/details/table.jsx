import React from 'react';

const DetailsTable = ({ data }) => {
  if (!data || Object.keys(data).length === 0) return <p>No data available</p>;
  const dataList = [
    { name: "Ps No", quantity: data.mold?.ps_no, process: "cavity", time: data.mold?.cavities },
    { name: "Loading Time", quantity: data.mold?.loading_time, process: "Working cavity", time: data.mold?.working_cavities },
    { name: "Cycle Time", quantity: data.mold?.cycle_time, process: "Mold Temprature", time: data.mold?.mold_temperature },
    { name: "Electricity", quantity: data.electricity?.status?.status, process: "Month Target", time: data.production?.target?.plan_target },
    { name: "Shift Target", quantity: data.production?.target?.shift_target, process: "Month Actual", time: data.production?.actual?.plan_actual },
    { name: "Shift Actual", quantity: data.production?.actual?.shift_actual, process: "Month Rejected", time: data.production?.rejected?.plan_rejected },
    { name: "Shift Reject", quantity: data.production?.rejected?.shift_rejected},
  ];

  return (
    <div className="space-y-6">
      <table className="w-full table-auto border border-gray-300">
        <tbody>
          {dataList.map((row, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="p-3 text-sm text-gray-700 border-r border-gray-200">{row.name}</td>
              <td className="p-3 text-sm text-gray-700 border-r border-gray-200">{row.quantity}</td>
              <td className="p-3 text-sm text-gray-700 border-r border-gray-200">{row.process}</td>
              <td className="p-3 text-sm text-gray-700">{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsTable;
