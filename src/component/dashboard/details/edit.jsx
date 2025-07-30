import React, { useEffect, useState } from 'react'
import secureApiFetch from '../../../services/apiFetch';

const MachinePlanEdit = ({ data,id }) => {
    const today = new Date().toISOString().split("T")[0];
    const [posDetail, setPosDetail] = useState([]);

    const [formData, setFormData] = useState({
        date: '',
        psNumber: '',
        target: 0,
        machine: '',
        planType: ''
    });

    useEffect(() => {
        if (data?.production?.plan?.[0]?.plan_date) {
            const rawDate = data.production.plan[0].plan_date;
            const [day, month, year] = rawDate.split("/");
            const formattedDate = `${year}-${month}-${day}`;
            setFormData({
                date: formattedDate,
                psNumber: data.mold?.ps_no || '',
                target: data.production?.target?.plan_target || 0,
                machine: id,
                planType: data.production.plan[0].plan_type
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'psNumber') {
            const today = new Date().toISOString().split("T")[0];
            setFormData(prev => ({
                ...prev,
                [name]: value,
                date: today 
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [posRes] = await Promise.all([
                    secureApiFetch("/api/v1/ps-nos")
                ]);
                const [posData] = await Promise.all([
                    posRes.json()
                ]);
                setPosDetail(posData);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('formData', formData)
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
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">PS Number</label>
                            <select
                                name="psNumber"
                                value={formData.psNumber}
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
                    </div>

                    <div className="space-y-4">
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
                </div>

                <div className="mt-6 text-left">
                    <button type="submit" className="Cbutton">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};


export default MachinePlanEdit