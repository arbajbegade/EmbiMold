import React from 'react';

const MoldDetails = () => {
  const dataTable = [
    { id: 1, name: "Ps No", quantity: '23', process: "cavity", time: 7 },
    { id: 2, name: "Loading Time", quantity: '433', process: "Running cavity", time: 12 },
    { id: 3, name: "Cycle Time", quantity: '232', process: "Mold Temprature", time: 2 },
    { id: 4, name: "Electricity", quantity: "ok", process: "Month Target", time: 4 },
    { id: 5, name: "Shift Target", quantity: '321', process: "Month Actual", time: 6 },
    { id: 6, name: "Shift Actual", quantity: '544', process: "Month Rejected", time: 2 },
    { id: 7, name: "Shift Reject", quantity: '343', process: "cavity", time: 1 },
  ];

  return (
    <div className="my-2 w-full h-full p-2 bg-white rounded-md shadow-lg">
      <table className="w-full table-auto border border-gray-300">
        <tbody>
          {dataTable.map((row, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="p-3 text-sm text-gray-700 border-r border-gray-200">{row.name}</td>
              <td className="p-3 text-sm text-gray-700 border-r border-gray-200">{row.quantity}</td>
              <td className="p-3 text-sm text-gray-700 border-r border-gray-200">{row.process}</td>
              <td className="p-3 text-sm text-gray-700">{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-blue-600 text-white px-4 m-2 py-2 rounded-md hover:bg-blue-700 transition duration-200 shadow cursor-pointer">
        Plan
      </button>

    </div>
  );
};

export default MoldDetails;
