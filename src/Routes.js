import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
const TeachingPage = lazy(() => import("./pages/Teaching/TeachingPage"));

const path =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? ""
    : "/admin/online";

function Routes(props) {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Switch>
        <Route path={`${path}/day-hoc`} component={TeachingPage} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
