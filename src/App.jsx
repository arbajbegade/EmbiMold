import React from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

import Index from "./component/AppBar/Index";
import PageNotFound from "./login/PageNotFound";
import Login from "./login/Login";
import theme from "./theme";
import DashboardRoutes from "./component/dashboard/route"
import PlanRoutes from "./component/prod plan/route";
import MoldROutes from "./component/mold/route";
import Droutes from "./component/department/route";
import MachineRoute from "./component/machine/route";
import TypeRoute from "./component/type/route";
import ShiftRoute from "./component/shift/route";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} >
            {DashboardRoutes}
            {PlanRoutes}
            {MoldROutes}
            {Droutes}
            {MachineRoute}
            {TypeRoute}
            {ShiftRoute}
            <Route path="*" element={<PageNotFound />} />
          </Route>

        </Routes>
      </ThemeProvider>
    </>
  )
}
