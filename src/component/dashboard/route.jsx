import { Route } from "react-router-dom";
import Dashboard from "./list";
import MoldDetails from "./MoldDetails";

const DashboardRoutes = (
    <>
        <Route index element={<Dashboard />} />
        <Route path="/details/:id" element={<MoldDetails />} />
    </>
)
export default DashboardRoutes;