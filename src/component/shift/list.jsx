import React, { useEffect, useState } from 'react';
import ShiftDetails from './details';
import secureApiFetch from '../../services/apiFetch';

const ShiftList = () => {
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await secureApiFetch("/api/v1/departments", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      const data = await response.json();
      setDepartments(data.data);
    } catch (error) {
      console.error("Department fetch error:", error);
      toast.error("Failed to fetch department data");
    }
  };
    useEffect(() => {
      fetchDepartments();
    }, []);

  return (
    <div className="my-2 pt-4 w-full h-full p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-6">Shift Details</h2>
      <ShiftDetails departments={departments} />
    </div>
  );
};

export default ShiftList;
