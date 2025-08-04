import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import secureApiFetch from '../../services/apiFetch';

const MachineDetails = ({ departments, machineTypes, machineModes }) => {
  const [formData, setFormData] = useState({
    department_id: '',
    wm_id: 0,
    machine_name: '',
    mt_id: 0,
    machine_enable: 0,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await secureApiFetch("/api/v1/machine-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // use JSON for structured data
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to submit Machine data");
      }
      const result = await response.json();
      toast.success('Machine Data Submitted Successfully!');
    } catch (error) {
      console.error("❌ Submission error:", error);
      toast.error("Failed to submit production plan");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Right Side */}
        <div className="space-y-4">
          {/* Enable Machine */}
          <div className="pt-1">
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.machine_enable === 1}
                  onChange={handleChange}
                  name="machine_enable"
                  color="primary"
                />
              }
              label="Enable Machine"
            />
          </div>

          {/* Department Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={(e) =>
                setFormData({ ...formData, department_id: parseInt(e.target.value) })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.department_id} value={dept.department_id}>
                  {dept.department_name}
                </option>
              ))}
            </select>
          </div>

          {/* Machine Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Machine Name</label>
            <input
              type="text"
              name="machine_name"
              value={formData.machine_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Working Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Working Mode</label>
            <select
              name="wm_id"
              value={formData.wm_id}
              onChange={(e) =>
                setFormData({ ...formData, wm_id: parseInt(e.target.value) })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Mode</option>
              {machineModes.map((mode) => (
                <option key={mode.id} value={mode.id}>
                  {mode.machine_mode}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Left Side */}
        <div className="space-y-4">
          {/* Machine Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Machine Type</label>
            <select
              name="mt_id"
              value={formData.mt_id}
              onChange={(e) =>
                setFormData({ ...formData, mt_id: parseInt(e.target.value) })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Type</option>
              {machineTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.machine_type}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={6}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 text-right">
          <button type="submit" className="Cbutton">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MachineDetails;
