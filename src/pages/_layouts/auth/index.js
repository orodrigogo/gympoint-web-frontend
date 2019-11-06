import React from "react";

import { Wrapper, Content } from "./styles";

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}
