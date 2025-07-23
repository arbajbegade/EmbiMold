import React, { useState } from 'react'
import PlanTable from './table';
import toast from 'react-hot-toast';

const PlanDetails = () => {
    const today = new Date().toISOString().split("T")[0];
    const [formData, setFormData] = useState({
        date: today,
        psNumber: '',
        target: '',
        machine: '',
        planType: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Data:', formData);
        toast.success('Production Plan Submitted Successfully!');
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input type="date" name="date" min={today} value={formData.date} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">PS Number</label>
                            <select name="psNumber" value={formData.psNumber} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required>
                                <option value="">Select PS Number</option>
                                <option value="PS001">PS001</option>
                                <option value="PS002">PS002</option>
                                <option value="PS003">PS003</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
                            <input type="number" name="target" value={formData.target} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Machine Name</label>
                            <select name="machine" value={formData.machine} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required>
                                <option value="">Select Machine</option>
                                <option value="Machine A">Machine A</option>
                                <option value="Machine B">Machine B</option>
                                <option value="Machine C">Machine C</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Plan Type</label>
                            <select name="planType" value={formData.planType} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required>
                                <option value="">Select Plan Type</option>
                                <option value="Day">Day</option>
                                <option value="Night">Night</option>
                                <option value="Full">Full Shift</option>
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
            <PlanTable />
        </div>
    );
};

export default PlanDetails