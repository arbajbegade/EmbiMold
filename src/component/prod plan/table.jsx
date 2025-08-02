import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import secureApiFetch from '../../services/apiFetch';
import toast from 'react-hot-toast';

const PlanTable = ({ prodData, setFormData }) => {
    const [selectedId, setSelectedId] = useState(null);

    const handleRadioChange = (item) => {
        setSelectedId(item.plan_no);
        setFormData({
            plan_date: item.plan_date || "",
            ps_no: item.ps_no || "",
            target: item.target || 0,
            machine_name: item.machine_name || "",
            uom: item.uom || "",
            department_name: item.department_name || "",
            plan_type: item.plan_type || ""
        });
    };

    const handleDelete = async (plan_no) => {
        const confirmed = window.confirm("Are you sure you want to delete this Production Plan?");
        if (!confirmed) return;
        try {
            const response = await secureApiFetch("/api/v1/production-plan", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({ plan_no: plan_no })
            });

            if (!response.ok) {
                const errorResult = await response.json();
                throw new Error(errorResult.message || "Failed to delete Production Plan");
            }
            const result = await response.json();
            toast.success("Production Plan deleted successfully!");
            fetchPlans()
        } catch (error) {
            console.error("Deletion error:", error);
            toast.error(error.message || "Something went wrong while deleting!");
        }
    };

    return (
        <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4">Production Plan Table</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border text-center">Sr No.</th>
                            <th className="px-4 py-2 border text-center">Select</th>
                            <th className="px-4 py-2 border text-center">Date</th>
                            <th className="px-4 py-2 border text-center">PS Number</th>
                            <th className="px-4 py-2 border text-center">Target</th>
                            <th className="px-4 py-2 border text-center">Machine Name</th>
                            <th className="px-4 py-2 border text-center">Production State</th>
                            <th className="px-4 py-2 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prodData.length === 0 ? (
                            <tr key='no-data'>
                                <td colSpan="9" className="text-center py-4 text-gray-500">
                                    No production plans available.
                                </td>
                            </tr>
                        ) : (
                            prodData.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td className="px-1 py-2 border"> {index + 1} </td>
                                    <td className="px-4 py-2 border">
                                        <input
                                            type="radio"
                                            name="selectedRow"
                                            checked={selectedId === item.plan_no}
                                            onChange={() => handleRadioChange(item)}
                                            className="form-radio text-blue-600 h-5 w-5 transition duration-150 ease-in-out cursor-pointer"
                                        />

                                    </td>
                                    <td className="px-4 py-2 border">{item.plan_date}</td>
                                    <td className="px-4 py-2 border">{item.ps_no}</td>
                                    <td className="px-4 py-2 border">{item.target}</td>
                                    <td className="px-4 py-2 border">{item.machine_name}</td>
                                    <td className="px-4 py-2 border">{item.production_state}</td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            className="text-red-600 hover:text-red-700 cursor-pointer"
                                            onClick={() => handleDelete(item.plan_no)}
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
