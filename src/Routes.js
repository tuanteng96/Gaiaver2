import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
const TeachingPage = lazy(() => import("./pages/Teaching/TeachingPage"));
const MissionPage = lazy (() => import("./pages/Mission/MissionPage"));


const path =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? ""
    : "/admin/online";

function Routes(props) {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Switch>
        <Route path={`${path}/day-hoc`} component={TeachingPage} />
        <Route path={`${path}/quan-ly-nhiem-vu`} component={MissionPage} />

      </Switch>
    </Suspense>
  );
}

export default Routes;
