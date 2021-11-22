import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
const TeachingPage = lazy(() => import("./pages/Teaching/TeachingPage"));
const MissionPage = lazy(() => import("./pages/Mission/MissionPage"));
const Statistical = lazy(() => import("./pages/Statistical/Statistical"));
const MissionReportPage = lazy(() =>
  import("./pages/MissionReport/MissionReportPage")
);
const PointsPage = lazy(() => import("./pages/Points/PointsPage"));

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
        <Route
          path={`${path}/bao-cao-nhiem-vu`}
          component={MissionReportPage}
        />
        <Route path={`${path}/cham-diem`} component={PointsPage} />
        <Route path={`${path}/thong-ke`} component={Statistical} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
