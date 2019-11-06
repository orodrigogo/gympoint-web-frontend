import React from "react";
import { Router } from "react-router-dom";

import GlobalStyles from "./styles/global";

// Para capturar os logs com o Reactotron.
import "./config/ReactotronConfig";

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
