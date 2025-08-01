import React, { useState } from 'react';

const ShiftDetails = ({ departments }) => {
  const [formData, setFormData] = useState({
    department: '',
    shift_name: '',
    shift_start_time: '',
    shift_end_time: '',
    break1_start_time: '',
    break1_end_time: '',
    break2_start_time: '',
    break2_end_time: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Shift Data:', formData);
    // toast.success('Shift details submitted successfully!');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Department Name */}
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
            {departments.map((dept) => (
              <option key={dept.department_id} value={dept.department_name}>
                {dept.department_name}
              </option>
            ))}
          </select>
        </div>

        {/* Shift Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shift Name</label>
          <input
            type="text"
            name="shift_name"
            value={formData.shift_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Shift Start */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shift Start</label>
          <input
            type="time"
            name="shift_start_time"
            value={formData.shift_start_time}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Shift End */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shift End</label>
          <input
            type="time"
            name="shift_end_time"
            value={formData.shift_end_time}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Break 1 Start */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Break 1 Start</label>
          <input
            type="time"
            name="break1_start_time"
            value={formData.break1_start_time}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Break 1 End */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Break 1 End</label>
          <input
            type="time"
            name="break1_end_time"
            value={formData.break1_end_time}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Break 2 Start */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Break 2 Start</label>
          <input
            type="time"
            name="break2_start_time"
            value={formData.break2_start_time}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Break 2 End */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Break 2 End</label>
          <input
            type="time"
            name="break2_end_time"
            value={formData.break2_end_time}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button type="submit" className="Cbutton">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShiftDetails;
