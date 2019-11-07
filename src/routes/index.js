import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

/* PAGES */
import SignIn from "../pages/SignIn";
import StudentList from "../pages/StudentList";
import StudentRegister from "../pages/StudentRegister";
import PlanList from "../pages/PlanList";
import PlanRegister from "../pages/PlanRegister";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/home" exact component={StudentList} isPrivate />
      <Route
        path="/studentregister"
        exact
        component={StudentRegister}
        isPrivate
      />
      <Route
        path="/studentregister/:id"
        exact
        component={StudentRegister}
        isPrivate
      />
      <Route path="/plans" exact component={PlanList} isPrivate />
      <Route path="/planregister" exact component={PlanRegister} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
