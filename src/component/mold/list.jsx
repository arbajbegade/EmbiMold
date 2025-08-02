import React, { useEffect, useState } from 'react'
import MoldDetails from './details'
import secureApiFetch from '../../services/apiFetch';
import MoldTable from './table';

const MoldList = () => {
  const [moldDetails, setMoldDetails] = useState([]);
   const [formData, setFormData] = useState({
    ps_no: '',
    loading_time: 0,
    cycle_time: 0,
    cavities: 0,
    working_cavities: 0,
    temperature: 0,
  });

  const fetchMoldDetails = async () => {
    try {
      const response = await secureApiFetch("/api/v1/mold-details", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setMoldDetails(data.data);
    } catch (error) {
      console.error("Mold fetch error:", error);
    }
  };
  useEffect(() => {
    fetchMoldDetails();
  }, []);
  return (
    <div className="my-2 pt-4 w-full h-full p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-1">Mold Details</h2>
      <MoldDetails fetchMoldDetails={fetchMoldDetails} formData={formData} setFormData={setFormData} />
      <MoldTable moldDetails={moldDetails} setFormData={setFormData} />
    </div>
  )
}

export default MoldList