import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const DTable = ({ departments, handleDelete }) => {
    return (
        <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 border text-center">Id</th>
                    <th className="px-4 py-2 border text-center">Department Name</th>
                    <th className="px-4 py-2 border text-center">Department Type</th>
                    <th className="px-4 py-2 border text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {departments.map((dept, index) => (
                    <tr key={index} className="text-center">
                        <td className="px-4 py-2 border">{dept.department_id}</td>
                        <td className="px-4 py-2 border">{dept.department_name}</td>
                        <td className="px-4 py-2 border">{dept.department_type}</td>
                        <td className="px-4 py-2 border">
                            <button onClick={() => handleDelete(dept.department_id)} className="text-red-600 hover:text-red-700 cursor-pointer">
                                <DeleteIcon />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default DTable