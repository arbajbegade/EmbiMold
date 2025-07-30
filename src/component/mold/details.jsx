import { useState } from 'react';
import toast from 'react-hot-toast';
import MoldTable from './table';
import secureApiFetch from '../../services/apiFetch';

const MoldDetails = ({moldDetails}) => {
  const [formData, setFormData] = useState({
    ps_no: '',
    loading_time: '',
    cycle_time: '',
    cavities: '',
    no_of_working_cavities: '',
    mold_temp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await secureApiFetch("/api/v1/mold-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to submit Mold Details");
      }

      const result = await response.json();
      console.log("✅ Submitted Data:", result);
      toast.success('Mold details Submitted Successfully!');
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong while submitting!");
    }
  };
 
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Left side - 3 columns */}
          <div className="md:col-span-3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PS Number</label>
              <input type="text" name="ps_no" value={formData.ps_no} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loading Time (sec)</label>
              <input type="number" name="loading_time" value={formData.loading_time} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cycle Time (sec)</label>
              <input type="number" name="cycle_time" value={formData.cycle_time} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
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
              <input type="number" name="no_of_working_cavities" value={formData.no_of_working_cavities} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mold Temp (°C)</label>
              <input type="number" name="mold_temp" value={formData.mold_temp} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>
          </div>
        </div>

        <div className="mt-6 text-left">
          <button type="submit" className="Cbutton">
            Submit
          </button>
        </div>
      </form>

      <MoldTable moldDetails={moldDetails}/>
    </div>
  );
};

export default MoldDetails;
