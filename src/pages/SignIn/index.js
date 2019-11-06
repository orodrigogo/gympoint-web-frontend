import React from "react";
import * as Yup from "yup";
import { Form, Input } from "@rocketseat/unform";
import { useDispatch } from "react-redux";

import { Wrapper, Container } from "./styles";
import logo from "../../assets/logo.svg";

/* ACTIONS */
import { signInRequest } from "../../store/modules/auth/actions";

/* SCHEMA COM YUP */
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: Yup.string().required("A senha é obrigatória")
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Wrapper>
      <Container>
        <img src={logo} alt="Gympoint" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
          <Input name="password" type="password" placeholder="*************" />

          <button type="submit">Entrar no sistema</button>
        </Form>
      </Container>
    </Wrapper>
  );
}
