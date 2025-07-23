import { useState } from 'react';
import toast from 'react-hot-toast';
import MoldTable from './table';

const MoldDetails = () => {
  const [formData, setFormData] = useState({
    psNumber: '',
    loadingTime: '',
    cycleTime: '',
    cavities: '',
    workingCavities: '',
    moldTemp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    toast.success('Mold Plan Submitted Successfully!');
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Left side - 3 columns */}
          <div className="md:col-span-3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PS Number</label>
              <input type="text" name="psNumber" value={formData.psNumber} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loading Time (sec)</label>
              <input type="number" name="loadingTime" value={formData.loadingTime} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cycle Time (sec)</label>
              <input type="number" name="cycleTime" value={formData.cycleTime} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>

          </div>

          {/* Right side - 2 columns */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cavities</label>
              <input type="number" name="cavities" value={formData.cavities} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Working Cavities</label>
              <input type="number" name="workingCavities" value={formData.workingCavities} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mold Temp (°C)</label>
              <input type="number" name="moldTemp" value={formData.moldTemp} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>
          </div>
        </div>

        <div className="mt-6 text-left">
          <button type="submit" className="Cbutton">
            Submit
          </button>
        </div>
      </form>

      <MoldTable />
    </div>
  );
};

export default MoldDetails;
