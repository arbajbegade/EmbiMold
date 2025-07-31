import PlanDetails from './details';
import secureApiFetch from "../../services/apiFetch"
import { useEffect, useState } from 'react';

const PlanList = () => {
  const [planType, setPlanType] = useState([]);
  const [machineName, setMachineName] = useState([]);
  const [posDetail, setPosDetail] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [planRes, machineRes, posRes] = await Promise.all([
          secureApiFetch("/api/v1/plan-types"),
          secureApiFetch("/api/v1/machine-names"),
          secureApiFetch("/api/v1/ps-nos")
        ]);

        const [planData, machineData, posData] = await Promise.all([
          planRes.json(),
          machineRes.json(),
          posRes.json()
        ]);

        setPlanType(planData.data);
        setMachineName(machineData);
        setPosDetail(posData);

      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="my-2 pt-4 w-full h-full p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-6">Production Plan List</h2>
      <PlanDetails planType={planType} machineName={machineName} posDetail={posDetail} />
    </div>
  );
};

export default PlanList;
