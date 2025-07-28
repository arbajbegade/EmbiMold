import React, { useState } from 'react';

const ShiftList = () => {
  const [formData, setFormData] = useState({
    department: '',
    shiftName: '',
    shiftStart: '',
    shiftEnd: '',
    teaStart: '',
    teaEnd: '',
    lunchStart: '',
    lunchEnd: '',
    secondTeaStart: '',
    secondTeaEnd: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Shift Data:', formData);
    // toast.success('Shift details submitted successfully!');
  };

  return (
    <div className="my-2 pt-4 w-full h-full p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-6">Shift Details</h2>

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
            <option value="HR">HR</option>
            <option value="Production">Production</option>
            <option value="Support">Support</option>
          </select>
        </div>

        {/* Shift Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shift Name</label>
          <input
            type="text"
            name="shiftName"
            value={formData.shiftName}
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
            name="shiftStart"
            value={formData.shiftStart}
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
            name="shiftEnd"
            value={formData.shiftEnd}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Tea Break Start */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tea Break Start</label>
          <input
            type="time"
            name="teaStart"
            value={formData.teaStart}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Tea Break End */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tea Break End</label>
          <input
            type="time"
            name="teaEnd"
            value={formData.teaEnd}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Lunch/Dinner Start */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lunch/Dinner Break Start</label>
          <input
            type="time"
            name="lunchStart"
            value={formData.lunchStart}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Lunch/Dinner End */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lunch/Dinner Break End</label>
          <input
            type="time"
            name="lunchEnd"
            value={formData.lunchEnd}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Second Tea Break Start */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Second Tea Break Start</label>
          <input
            type="time"
            name="secondTeaStart"
            value={formData.secondTeaStart}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Second Tea Break End */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Second Tea Break End</label>
          <input
            type="time"
            name="secondTeaEnd"
            value={formData.secondTeaEnd}
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

export default ShiftList;
