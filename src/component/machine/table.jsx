import React, { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import secureApiFetch from '../../services/apiFetch';
import toast from 'react-hot-toast';

const MachineTable = ({ machine,fetchMachines }) => {
     const handleDelete = async (machineId) => {
        try {
            const response = await secureApiFetch("/api/v1/machine-details", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({ machine_id: machineId })
            });

            if (!response.ok) {
                const errorResult = await response.json();
                throw new Error(errorResult.message || "Failed to delete Machine");
            }
            const result = await response.json();
            toast.success("Machine deleted successfully!");
            fetchMachines()
        } catch (error) {
            console.error("Deletion error:", error);
            toast.error(error.message || "Something went wrong while deleting!");
        }
    };
    return (
        <div>
            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border text-center">Machine Name</th>
                        <th className="px-4 py-2 border text-center">Department</th>
                        <th className="px-4 py-2 border text-center">Type</th>
                        <th className="px-4 py-2 border text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {machine.map((machine, index) => (
                        <tr key={index} className="text-center">
                            <td className="px-4 py-2 border">{machine.machine_name}</td>
                            <td className="px-4 py-2 border">{machine.department_id}</td>
                            <td className="px-4 py-2 border">Machine {machine.mt_id}</td>
                            <td className="px-4 py-2 border">
                            <button onClick={() => handleDelete(machine.machine_id)} className="text-red-600 hover:text-red-700 cursor-pointer">
                                <DeleteIcon />
                            </button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MachineTable