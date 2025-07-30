import React, { useState } from 'react';
import mqttClient from '../../../services/mqttClient';
import toast from 'react-hot-toast';

const CavityEdit = ({ data, id,handleClose }) => {
    const [workingCavities, setWorkingCavities] = useState(data.working_cavities);

    const handleChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 1 && value <= data.cavities) {
            setWorkingCavities(value);
        }
    };

const handleSubmit = (e) => {
  e.preventDefault();

  const payload = {
    ps_no: data.ps_no,
    cavities: data.cavities,
    working_cavities: workingCavities,
    cycle_time: data.cycle_time,
    loading_time: data.loading_time,
    mold_temperature: data.mold_temperature,
    shift_target: data.shift_target,
  };

  const topic = `premierseals/chinchwad/molding/${id}/mold`;

  try {
    mqttClient.publish(topic, JSON.stringify(payload), { retain: true }, (err) => {
      if (err) {
        toast.error('❌ Failed to publish to MQTT');
        console.error("MQTT publish error:", err);
      } else {
        toast.success('Data sent to MQTT successfully');
        console.log("📤 Sent to MQTT:", topic, payload);
        handleClose()
      }
    });
  } catch (error) {
    toast.error('⚠️ MQTT Error');
    console.error("Unexpected MQTT error:", error);
  }
};
    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
                <label className="block font-semibold mb-1">Working Cavities</label>
                <input
                    type="number"
                    value={workingCavities}
                    min={1}
                    max={data.cavities}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded w-full"
                />
                <small className="text-gray-500">Max allowed: {data.cavities}</small>
            </div>

            <button type="submit" className="Cbutton">
                Submit
            </button>
        </form>
    );
};

export default CavityEdit;
