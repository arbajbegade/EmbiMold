import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import MachineTable from './table';
import MachineDetails from './details';
import secureApiFetch from '../../services/apiFetch';
import RestrictedComponent from '../../permissions/RestrictedComponent';

const MachineList = () => {
  const [machine, setMachine] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [machineTypes, setMachineTypes] = useState([]);
  const [machineModes, setMachineModes] = useState([]);

  const fetchMachines = async () => {
    try {
      const response = await secureApiFetch("/api/v1/machine-details", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setMachine(data.data);
    } catch (error) {
      console.error("Machine fetch error:", error);
      toast.error("Failed to fetch Machine data");
    }
  };
  const fetchMachineTypes = async () => {
    try {
      const response = await secureApiFetch("/api/v1/machine-types", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setMachineTypes(data.data);
    } catch (error) {
      console.error("Machine fetch error:", error);
      toast.error("Failed to fetch Machine data");
    }
  };
  const fetchMachineModes = async () => {
    try {
      const response = await secureApiFetch("/api/v1/machine-modes", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setMachineModes(data.data);
    } catch (error) {
      console.error("Machine fetch error:", error);
      toast.error("Failed to fetch Machine data");
    }
  };

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
    fetchMachines();
    fetchMachineTypes();
    fetchMachineModes();
  }, []);


  return (
    <div className="my-2 pt-4 w-full h-full p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-6">Machine Details</h2>
      <RestrictedComponent roles={['embedsol']}>
        <MachineDetails departments={departments} machineTypes={machineTypes} machineModes={machineModes} />
      </RestrictedComponent>
      <MachineTable machine={machine} fetchMachines={fetchMachines} />
    </div>
  );
};

export default MachineList;
