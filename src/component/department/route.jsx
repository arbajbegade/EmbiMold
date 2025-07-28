import { Route } from "react-router-dom";
import DepartmentList from "./list";

const Droutes = (
    <>
        <Route path="/setting/department" element={<DepartmentList />} />
    </>
)
export default Droutes;