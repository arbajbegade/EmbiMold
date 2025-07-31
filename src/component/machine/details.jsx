import React, { useState } from 'react'
import toast from 'react-hot-toast';

const MachineDetails = ({ departments, machineTypes, machineModes }) => {
  const [formData, setFormData] = useState({
    department: '',
    machineName: '',
    machineType: '',
    description: '',
    machine_type: ''
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
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            {departments.map((dept) => (
              <option key={dept.department_id} value={dept.department_name}>
                {dept.department_name}
              </option>))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Working Mode</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            {machineModes.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.machine_mode}
              </option>))}
          </select>
        </div>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Machine Type</label>
          <select
            name="machine_type"
            value={formData.machine_type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            {machineTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.machine_type}
              </option>))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Machine Enable</label>
          <input
            type="checkbox"
            name="machineEnable"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
          />
        </div>
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

        <div className="col-span-2">
          <button type="submit" className="Cbutton">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default MachineDetails