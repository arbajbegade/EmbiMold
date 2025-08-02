import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const MoldTable = ({ moldDetails, setFormData }) => {
  const [selectedId, setSelectedId] = useState(null);
  const handleRadioChange = (item) => {
    setSelectedId(item.mold_id);
    setFormData({
      ps_no: item.ps_no || "",
      loading_time: item.loading_time || "",
      cycle_time: item.cycle_time || 0,
      cavities: item.cavities || "",
      working_cavities: item.working_cavities || "",
      mold_temp: item.temperature || ""
    });
  };
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
              <th className="px-4 py-2 border text-center">Cavities</th>
              <th className="px-4 py-2 border text-center">Running Cavities</th>
              <th className="px-4 py-2 border text-center">Mold Temp</th>
              <th className="px-4 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {moldDetails.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">
                  <input
                    type="radio"
                    name="selectedRow"
                    checked={selectedId === item.mold_id}
                    onChange={() => handleRadioChange(item)}
                    className="form-radio text-blue-600 h-5 w-5 transition duration-150 ease-in-out cursor-pointer"
                  />
                </td>
                <td className="px-4 py-2 border">{item.ps_no}</td>
                <td className="px-4 py-2 border">{item.loading_time}</td>
                <td className="px-4 py-2 border">{item.cycle_time}</td>
                <td className="px-4 py-2 border">{item.cavities}</td>
                <td className="px-4 py-2 border">{item.working_cavities}</td>
                <td className="px-4 py-2 border">{item.temperature}</td>
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
