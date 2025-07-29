import { Route } from "react-router-dom";
import MoldList from "./list"

const MoldRoute = (
    <>
        <Route path="/parts/mold" element={<MoldList />} />
    </>
)
export default MoldRoute;