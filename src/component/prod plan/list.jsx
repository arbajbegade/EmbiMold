import PlanDetails from './details';
import secureApiFetch from "../../services/apiFetch"
import { useEffect, useState } from 'react';

const PlanList = () => {
  const [planType, setPlanType] = useState([]);
  const [machineName, setMachineName] = useState([]);
  const [posDetail, setPosDetail] = useState([]);
  const [units, setUnits] = useState([]);
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [planRes, machineRes, posRes, unitRes, depRes] = await Promise.all([
          secureApiFetch("/api/v1/plan-types"),
          secureApiFetch("/api/v1/machine-names"),
          secureApiFetch("/api/v1/ps-nos"),
          secureApiFetch("/api/v1/units"),
          secureApiFetch("/api/v1/departments")
        ]);

        const [planData, machineData, posData, unitData, depData] = await Promise.all([
          planRes.json(),
          machineRes.json(),
          posRes.json(),
          unitRes.json(),
          depRes.json()
        ]);

        setPlanType(planData.data);
        setMachineName(machineData);
        setPosDetail(posData);
        setUnits(unitData);
        setDepartment(depData.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="my-2 pt-4 w-full h-full p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-6">Production Plan List</h2>
      <PlanDetails planType={planType} machineName={machineName} posDetail={posDetail} units={units} department={department}/>
    </div>
  );
};

export default PlanList;
