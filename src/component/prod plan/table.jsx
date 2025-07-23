import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const PlanTable = () => {
    const [selectedId, setSelectedId] = useState(null);

    const dummyData = [
        {
            id: 1,
            date: '2025-07-23',
            psNumber: 'PS-101',
            target: 500,
            machineName: 'Machine A',
            planType: 'Type 1',
        },
        {
            id: 2,
            date: '2025-07-24',
            psNumber: 'PS-102',
            target: 600,
            machineName: 'Machine B',
            planType: 'Type 2',
        },
    ];

    return (
        <div className="">
            <h2 className="text-lg font-semibold mb-4">Production Plan Table</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border text-center">Select</th>
                            <th className="px-4 py-2 border text-center">Date</th>
                            <th className="px-4 py-2 border text-center">PS Number</th>
                            <th className="px-4 py-2 border text-center">Target</th>
                            <th className="px-4 py-2 border text-center">Machine Name</th>
                            <th className="px-4 py-2 border text-center">Plan Type</th>
                            <th className="px-4 py-2 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyData.map((item) => (
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
                                <td className="px-4 py-2 border">{item.date}</td>
                                <td className="px-4 py-2 border">{item.psNumber}</td>
                                <td className="px-4 py-2 border">{item.target}</td>
                                <td className="px-4 py-2 border">{item.machineName}</td>
                                <td className="px-4 py-2 border">{item.planType}</td>
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

export default PlanTable;
