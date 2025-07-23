import PlanDetails from './details';
import secureApiFetch from "../../services/apiFetch"
import { useEffect } from 'react';

const PlanList = () => {
  useEffect(() => {
    secureApiFetch("/api/v1/plan-types", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  }, [])

  return (
    <div className="my-2 pt-4 w-full h-full p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-6">Production Plan List</h2>
      <PlanDetails />
    </div>
  );
};

export default PlanList;
