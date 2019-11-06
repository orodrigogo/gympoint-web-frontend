import React from "react";
import { ToastContainer } from "react-toastify";
import { Router } from "react-router-dom";

// Para capturar os logs com o Reactotron.
import "./config/ReactotronConfig";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import GlobalStyles from "./styles/global";

import { store, persistor } from "./store";

import Routes from "./routes";
import history from "./services/history";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <GlobalStyles />
          <ToastContainer autoClose={3000} />
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
