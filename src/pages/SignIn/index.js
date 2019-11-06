import React from "react";
import { Form, Input } from "@rocketseat/unform";

import { Wrapper, Container } from "./styles";
import logo from "../../assets/logo.svg";

export default function SignIn() {
  return (
    <Wrapper>
      <Container>
        <img src={logo} alt="Gympoint" />

        <Form>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
          <Input name="password" type="password" placeholder="*************" />
          <button type="submit">Entrar no sistema</button>
        </Form>
      </Container>
    </Wrapper>
  );
}
