import React from "react";
import { Router } from "react-router-dom";

import GlobalStyles from "./styles/global";

import Routes from "./routes";
import history from "./services/history";

function App() {
  return (
    <Router history={history}>
      <GlobalStyles />
      <Routes />
    </Router>
  );
}

export default App;
