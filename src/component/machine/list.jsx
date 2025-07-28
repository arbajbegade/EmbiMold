import React, { useState } from 'react';
import toast from 'react-hot-toast';

const MachineList = () => {
  const [formData, setFormData] = useState({
    department: '',
    machineName: '',
    machineType: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    toast.success('Machine Data Submitted Successfully!');
  };

  return (
    <div className="my-2 pt-4 w-full h-full p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-6">Machine Details</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mb-6">
        {/* Left Column */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Support">Support</option>
          </select>
        </div>

        {/* Right Column */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Machine Name</label>
          <input
            type="text"
            name="machineName"
            value={formData.machineName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Left Column */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Machine Type</label>
          <select
            name="machineType"
            value={formData.machineType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Type</option>
            <option value="Automatic">Automatic</option>
            <option value="Semi-Automatic">Semi-Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        {/* Right Column */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button type="submit" className="Cbutton">
            Submit
          </button>
        </div>
      </form>

      {/* Table */}
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border text-center">ID</th>
            <th className="px-4 py-2 border text-center">Department</th>
            <th className="px-4 py-2 border text-center">Machine Name</th>
            <th className="px-4 py-2 border text-center">Type</th>
            <th className="px-4 py-2 border text-center">Description</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((id) => (
            <tr key={id} className="text-center">
              <td className="px-4 py-2 border">{id}</td>
              <td className="px-4 py-2 border">Engineering</td>
              <td className="px-4 py-2 border">Machine {id}</td>
              <td className="px-4 py-2 border">Automatic</td>
              <td className="px-4 py-2 border">This is machine {id} description.</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineList;
