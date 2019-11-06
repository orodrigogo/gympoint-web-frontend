import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

/* PAGES */
import SignIn from "../pages/SignIn";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/teste" exact component={() => <h1>Teste</h1>} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
