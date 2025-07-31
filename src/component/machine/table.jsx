import React, { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const MachineTable = ({ machine }) => {
    const handleDelete = (machineId) => {
        console.log('Delete machine with ID:', machineId);
        // Implement delete functionality here
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
                            <button onClick={() => handleDelete(dept.department_id)} className="text-red-600 hover:text-red-700 cursor-pointer">
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