import React, { useEffect, useState } from "react";
import { MdControlPoint, MdArrowBack } from "react-icons/md";
import { Form, Input } from "@rocketseat/unform";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { Container, Content } from "./styles";

import history from "../../services/history";
import api from "../../services/api";

export default function PlanRegister({ match }) {
  /* SCHEMA COM YUP */
  const schema = Yup.object().shape({
    title: Yup.string().required("O título do plano é obrigatório"),
    duration: Yup.string().required("A duração do plano é obrigatório"),
    price: Yup.string().required("O valor do plano é obrigatória")
  });

  const [plan, setPlan] = useState([]);
  const [edit, setEdit] = useState(false);

  async function loadPlan(id) {
    const response = await api.get(`plans/${id}`);
    loadPlan(response.data);
  }

  useEffect(() => {
    if (match.params.id) {
      setEdit(true);
      loadPlan(match.params.id);
    }
  }, []);

  function handleReturn() {
    // Volta para a página anterior.
    history.goBack();
  }

  async function handleAdd({ title, duration, price }) {
    await api
      .post("plans", {
        title,
        duration,
        price
      })
      .then(response => {
        if (response.data.error === "Plan already exists") {
          toast.error("Já existe um plano cadastrado com esse nome");
        } else {
          toast.success("Plano cadastrado com sucesso!");
          history.goBack();
        }
      })
      .catch(error => {
        toast.error(
          `Não foi possível cadastrar o plano. Detalhes: ${error.message}`
        );
      });
  }

  async function handleSave({ title, duration, price }) {
    await api
      .put(`plans/${match.params.id}`, {
        title,
        duration,
        price
      })
      .then(response => {
        toast.success("Dados do plano atualizado com sucesso!");
        history.goBack();
      })
      .catch(error => {
        toast.error(
          `Não foi possível atualizar os dados do plano. Detalhes: ${error.message}`
        );
      });
  }

  return (
    <Container>
      <header>
        <h1>{edit ? "Edição de plano" : "Cadastro de plano"}</h1>
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
            <h3>TÍTULO DO PLANO</h3>
            <Input
              name="title"
              type="text"
              value={plan ? plan.title : null}
              onChange={e => setPlan({ title: e.target.value })}
            />
          </div>

          <div className="same-row">
            <div>
              <h3>DURAÇÃO (em meses)</h3>
              <Input
                name="duration"
                type="number"
                value={plan ? plan.duration : null}
                onChange={e => setPlan({ duration: e.target.value })}
              />
            </div>

            <div>
              <h3>PREÇO MENSAL</h3>
              <Input
                name="price"
                type="text"
                value={plan ? plan.price : null}
                onChange={e => setPlan({ price: e.target.value })}
              />
            </div>

            <div>
              <h3>PREÇO TOTAL</h3>
              <Input readOnly name="height" type="text" />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
