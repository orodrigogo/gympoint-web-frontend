import React from "react";
import { MdControlPoint, MdArrowBack } from "react-icons/md";
import { Form, Input } from "@rocketseat/unform";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { Container, Content } from "./styles";

import history from "../../services/history";
import api from "../../services/api";

export default function StudentRegister() {
  /* SCHEMA COM YUP */
  const schema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
    email: Yup.string().required("O e-mail é obrigatório"),
    age: Yup.string().required("A idade é obrigatória"),
    weight: Yup.string().required("O Peso é obrigatório"),
    height: Yup.string().required("A altura é obrigatória")
  });

  function handleReturn() {
    // Volta para a página anterior.
    history.goBack();
  }

  async function handleSave({ name, email, age, weight, height }) {
    await api
      .post("students", {
        name,
        email,
        age,
        weight,
        height
      })
      .then(response => {
        if (response.data.error === "Student exists") {
          toast.error("Já existe um usuário cadastrado com esse e-mail");
        } else {
          toast.success("Usuário cadastrado com sucesso!");
          history.goBack();
        }
      })
      .catch(error => {
        toast.error(
          `Não foi possível cadastrar o aluno. Detalhes: ${error.message}`
        );
      });
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando alunos</h1>
        <aside>
          <button className="return" type="button" onClick={handleReturn}>
            <MdArrowBack color="#FFF" fontSize={18} />
            VOLTAR
          </button>
          <button type="submit" form="registerForm">
            <MdControlPoint color="#FFF" fontSize={18} />
            SALVAR
          </button>
        </aside>
      </header>
      <Content>
        <Form id="registerForm" schema={schema} onSubmit={handleSave}>
          <div>
            <h3>NOME COMPLETO</h3>
            <Input name="name" type="text" />
          </div>

          <div>
            <h3>ENDEREÇO DE E-MAIL</h3>
            <Input name="email" type="email" />
          </div>

          <div className="same-row">
            <div>
              <h3>IDADE</h3>
              <Input name="age" type="number" />
            </div>

            <div>
              <h3>PESO (em kg)</h3>
              <Input name="weight" type="text" />
            </div>

            <div>
              <h3>ALTURA</h3>
              <Input name="height" type="text" />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
