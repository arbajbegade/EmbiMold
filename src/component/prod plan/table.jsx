import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import secureApiFetch from '../../services/apiFetch';

const PlanTable = () => {
    const [plans, setPlans] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await secureApiFetch("/api/v1/production-plan", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch production plans");
                }

                const result = await response.json();
                console.log('✅ Fetched Plans:', result);
                setPlans(result.data);
            } catch (error) {
                console.error("❌ Fetch error:", error);
            }
        };

        fetchPlans();
    }, []);

    return (
        <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4">Production Plan Table</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border text-center">Select</th>
                            <th className="px-4 py-2 border text-center">Date</th>
                            <th className="px-4 py-2 border text-center">PS Number</th>
                            <th className="px-4 py-2 border text-center">Target</th>
                            <th className="px-4 py-2 border text-center">Actual</th>
                            <th className="px-4 py-2 border text-center">Rejected</th>
                            <th className="px-4 py-2 border text-center">Machine Name</th>
                            <th className="px-4 py-2 border text-center">Status</th>
                            <th className="px-4 py-2 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center py-4 text-gray-500">
                                    No production plans available.
                                </td>
                            </tr>
                        ) : (
                            plans.map((item) => (
                                <tr key={item.plan_id} className="text-center">
                                    <td className="px-4 py-2 border">
                                        <input
                                            type="radio"
                                            name="selectedRow"
                                            checked={selectedId === item.plan_id}
                                            onChange={() => setSelectedId(item.plan_id)}
                                            className="form-radio text-blue-600 h-5 w-5 transition duration-150 ease-in-out cursor-pointer"
                                        />
                                    </td>
                                    <td className="px-4 py-2 border">{item.plan_date}</td>
                                    <td className="px-4 py-2 border">{item.ps_no}</td>
                                    <td className="px-4 py-2 border">{item.target_qty}</td>
                                    <td className="px-4 py-2 border">{item.actual_qty}</td>
                                    <td className="px-4 py-2 border">{item.rejected_qty}</td>
                                    <td className="px-4 py-2 border">{item.machine_name}</td>
                                    <td className="px-4 py-2 border">{item.production_status}</td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            className="text-red-600 hover:text-red-700 cursor-pointer"
                                            onClick={() => console.log("Delete plan", item.plan_id)}
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlanTable;
