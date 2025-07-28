import { Route } from "react-router-dom";
import MachineList from "./list";

const MachineRoute = (
    <>
        <Route path="/setting/machine" element={<MachineList />} />
    </>
)
export default MachineRoute;