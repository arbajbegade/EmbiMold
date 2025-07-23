import { Route } from "react-router-dom";
import PlanList from "./list";

const PlanRoutes = (
    <>
        <Route path="/productionplan" element={<PlanList />} />
    </>
)
export default PlanRoutes;