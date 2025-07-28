import { Route } from "react-router-dom";
import TypeList from "./list";

const TypeRoute = (
    <>
        <Route path="/setting/type" element={<TypeList />} />
    </>
)
export default TypeRoute;