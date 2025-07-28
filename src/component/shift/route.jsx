import { Route } from "react-router-dom";
import ShiftList from "./list";

const ShiftRoute = (
    <>
        <Route path="/setting/shift" element={<ShiftList />} />
    </>
)
export default ShiftRoute;