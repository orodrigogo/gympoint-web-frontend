import React from "react";

import Header from "../../../components/Header";
import { Wrapper } from "./styles";

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
}
