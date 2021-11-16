import React, { lazy, Suspense } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
const TeachingPage = lazy(() => import("./pages/Teaching/TeachingPage"));

function Routes(props) {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Switch>
        <Route path="/day-hoc" component={TeachingPage} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
