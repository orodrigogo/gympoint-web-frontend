import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

/* PAGES */
import SignIn from "../pages/SignIn";
import Home from "../pages/home";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/home" exact component={Home} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
