import PlanDetails from './details';

const PlanList = () => {
  return (
    <div className="my-2 pt-4 w-full h-full p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-6">Production Plan List</h2>
      <PlanDetails />
    </div>
  );
};

export default PlanList;
