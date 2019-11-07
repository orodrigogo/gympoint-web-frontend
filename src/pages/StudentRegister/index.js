import React, { useEffect, useState } from "react";
import { MdControlPoint, MdArrowBack } from "react-icons/md";
import { Form, Input } from "@rocketseat/unform";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { Container, Content } from "./styles";

import history from "../../services/history";
import api from "../../services/api";

export default function StudentRegister({ match }) {
  /* SCHEMA COM YUP */
  const schema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
    email: Yup.string().required("O e-mail é obrigatório"),
    age: Yup.string().required("A idade é obrigatória"),
    weight: Yup.string().required("O Peso é obrigatório"),
    height: Yup.string().required("A altura é obrigatória")
  });

  const [student, setStudent] = useState([]);
  const [edit, setEdit] = useState(false);

  async function loadStudent(id) {
    const response = await api.get(`students/${id}`);
    setStudent(response.data);
  }

  useEffect(() => {
    if (match.params.id) {
      setEdit(true);
      loadStudent(match.params.id);
    }
  }, []);

  function handleReturn() {
    // Volta para a página anterior.
    history.goBack();
  }

  async function handleAdd({ name, email, age, weight, height }) {
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
          toast.error("Já existe um aluno cadastrado com esse e-mail");
        } else {
          toast.success("Aluno cadastrado com sucesso!");
          history.goBack();
        }
      })
      .catch(error => {
        toast.error(
          `Não foi possível cadastrar o aluno. Detalhes: ${error.message}`
        );
      });
  }

  async function handleSave({ name, email, age, weight, height }) {
    await api
      .put(`students/${match.params.id}`, {
        name,
        email,
        age,
        weight,
        height
      })
      .then(response => {
        toast.success("Dados do aluno atualizado com sucesso!");
        history.goBack();
      })
      .catch(error => {
        toast.error(
          `Não foi possível atualizar os dados do aluno. Detalhes: ${error.message}`
        );
      });
  }

  return (
    <Container>
      <header>
        <h1>{edit ? "Edição de aluno" : "Cadastro de aluno"}</h1>
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
        <Form
          id="registerForm"
          schema={schema}
          onSubmit={edit ? handleSave : handleAdd}
        >
          <div>
            <h3>NOME COMPLETO</h3>
            <Input
              name="name"
              type="text"
              value={student ? student.name : null}
              onChange={e => setStudent({ name: e.target.value })}
            />
          </div>

          <div>
            <h3>ENDEREÇO DE E-MAIL</h3>
            <Input
              name="email"
              type="email"
              value={student ? student.email : null}
              onChange={e => setStudent({ email: e.target.value })}
            />
          </div>

          <div className="same-row">
            <div>
              <h3>IDADE</h3>
              <Input
                name="age"
                type="number"
                value={student ? student.age : null}
                onChange={e => setStudent({ age: e.target.value })}
              />
            </div>

            <div>
              <h3>PESO (em kg)</h3>
              <Input
                name="weight"
                type="text"
                value={student ? student.weight : null}
                onChange={e => setStudent({ weight: e.target.value })}
              />
            </div>

            <div>
              <h3>ALTURA</h3>
              <Input
                name="height"
                type="text"
                value={student ? student.height : null}
                onChange={e => setStudent({ height: e.target.value })}
              />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
