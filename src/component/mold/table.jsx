import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const MoldTable = () => {
  const [selectedId, setSelectedId] = useState(null);

  const moldDetails = [
    {
      id: 1,
      psNumber: "M-101",
      loadingTIme: "3",
      cycleTime: "2",
      runnigCavity: 4,
      moldTemp: "45",
    },
    {
      id: 2,
      psNumber: "M-102",
      loadingTIme: "4",
      cycleTime: "7",
      runnigCavity: 2,
      moldTemp: "52",
    }
  ];

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-4">Mold Details Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-center">Select</th>
              <th className="px-4 py-2 border text-center">PS Number</th>
              <th className="px-4 py-2 border text-center">Loading Time</th>
              <th className="px-4 py-2 border text-center">Cycle Time</th>
              <th className="px-4 py-2 border text-center">Running Cavities</th>
              <th className="px-4 py-2 border text-center">Mold Temp</th>
              <th className="px-4 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {moldDetails.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="px-4 py-2 border">
                  <input
                    type="radio"
                    name="selectedRow"
                    checked={selectedId === item.id}
                    onChange={() => setSelectedId(item.id)}
                    className="form-radio text-blue-600 h-5 w-5 transition duration-150 ease-in-out cursor-pointer"
                  />
                </td>
                <td className="px-4 py-2 border">{item.psNumber}</td>
                <td className="px-4 py-2 border">{item.loadingTIme}</td>
                <td className="px-4 py-2 border">{item.cycleTime}</td>
                <td className="px-4 py-2 border">{item.runnigCavity}</td>
                <td className="px-4 py-2 border">{item.moldTemp}</td>
                <td className="px-4 py-2 border">
                  <button className="text-red-600 hover:text-red-700 cursor-pointer">
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoldTable;
