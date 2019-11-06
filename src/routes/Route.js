import React from "react";
import { Route, Redirect } from "react-router-dom";
import { store } from "../store";

/* LAYOUT PARTS */
import AuthLayout from "../pages/_layouts/auth";
import DefaultLayout from "../pages/_layouts/default";

export default function RouterWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  // Carregando o layout baseano na autenticacao. Crio o Layout com L maisculo para ser entendido pelo JSX como um componente.
  const Layout = signed ? DefaultLayout : AuthLayout;
  return (
    <Route
      {...rest} // rest qualquer outra props aqui.
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}
