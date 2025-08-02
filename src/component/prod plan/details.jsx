import React, { useEffect, useState } from 'react';
import PlanTable from './table';
import toast from 'react-hot-toast';
import secureApiFetch from '../../services/apiFetch';

const PlanDetails = ({ planType, machineName, posDetail, units, department }) => {
  const today = new Date().toISOString().split("T")[0];
  const [prodData, setProdData] = useState([]);
  const [formData, setFormData] = useState({
    plan_date: today,
    ps_no: '',
    target: 0,
    machine_name: '',
    uom: "",
    department_name: "",
    plan_type: ''
  });

  const fetchPlans = async () => {
    try {
      const response = await secureApiFetch("/api/v1/production-plan", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch production plans");
      }
      const result = await response.json();
      setProdData(result.data);
    } catch (error) {
      console.error("❌ Fetch error:", error);
    }
  };
  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await secureApiFetch("/api/v1/production-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // use JSON for structured data
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to submit production plan");
      }
      const result = await response.json();
      toast.success('Production Plan Submitted Successfully!');
      fetchPlans()
    } catch (error) {
      console.error("❌ Submission error:", error);
      toast.error("Failed to submit production plan");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="plan_date"
                min={today}
                value={formData.plan_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PS Number</label>
              <select
                name="ps_no"
                value={formData.ps_no}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="">Select PS Number</option>
                {posDetail.map((item) => (
                  <option key={item.mold_id} value={item.ps_no}>
                    {item.ps_no}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
              <select
                name="department_name"
                value={formData.department_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="">Select Department Name</option>
                {department.map((item) => (
                  <option key={item.department_id} value={item.department_name}>
                    {item.department_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
              <input
                type="number"
                name="target"
                value={formData.target}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Machine Name</label>
              <select
                name="machine_name"
                value={formData.machine_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="">Select Machine</option>
                {machineName.map((machine) => (
                  <option key={machine.machine_id} value={machine.machine_name}>
                    {machine.machine_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plan Type</label>
              <select
                name="plan_type"
                value={formData.plan_type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="">Select Plan Type</option>
                {planType.map((type) => (
                  <option key={type.pt_id} value={type.plan_type}>
                    {type.plan_type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
              <select
                name="uom"
                value={formData.uom}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="">Select Unit</option>
                {units.map((type) => (
                  <option key={type.uom_id} value={type.uom}>
                    {type.uom}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 text-left">
          <button type="submit" className="Cbutton">
            Submit
          </button>
        </div>
      </form>
      <PlanTable setFormData={setFormData} prodData={prodData} />
    </div>
  );
};

export default PlanDetails;
