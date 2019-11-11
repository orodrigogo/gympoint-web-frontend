import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

/* PAGES */
import SignIn from "../pages/SignIn";
import StudentList from "../pages/StudentList";
import StudentRegister from "../pages/StudentRegister";
import PlanList from "../pages/PlanList";
import PlanRegister from "../pages/PlanRegister";
import MatriculateRegister from "../pages/MatriculateRegister";
import MatriculateList from "../pages/MatriculateList";
import Orders from "../pages/Orders";

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
      <Route
        path="/planregister/:id"
        exact
        component={PlanRegister}
        isPrivate
      />

      <Route
        path="/matriculateregister"
        exact
        component={MatriculateRegister}
        isPrivate
      />

      <Route path="/matriculates" exact component={MatriculateList} isPrivate />
      <Route
        path="/matriculateregister/:id"
        exact
        component={MatriculateRegister}
        isPrivate
      />

      <Route path="/orders" exact component={Orders} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
