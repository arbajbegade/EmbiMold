import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const DepartmentList = () => {
  const [formData, setFormData] = useState({
    departmentName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    toast.success('Department Name Submitted Successfully!');
  };

  return (
    <div className="my-2 pt-4 w-full h-full p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-6">Department Details</h2>
      
      {/* Input and button in one row */}
      <form onSubmit={handleSubmit} className="flex items-center gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department Name
          </label>
          <input
            type="text"
            name="departmentName"
            value={formData.departmentName}
            onChange={handleChange}
            className="w-64 border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <button type="submit" className="Cbutton mt-6">
          Submit
        </button>
      </form>

      {/* Table with dummy data */}
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border text-center">Id</th>
            <th className="px-4 py-2 border text-center">Department Name</th>
            <th className="px-4 py-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {['HR', 'Finance', 'Engineering', 'Marketing', 'Support'].map((dept, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{dept}</td>
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
  );
};

export default DepartmentList;
