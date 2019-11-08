import React, { useState, useEffect } from "react";
import { MdControlPoint, MdArrowBack } from "react-icons/md";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

import AsyncSelect from "react-select/async";
import Select from "react-select";

import api from "../../services/api";

import { Container, Content } from "./styles";

export default function Matriculate() {
  /* SCHEMA COM YUP */
  const schema = Yup.object().shape({
    student: Yup.string().required("O aluno é obrigatório"),
    plan: Yup.string().required("O plano é obrigatório"),
    start_date: Yup.date().required("A data de início é obrigatória")
  });

  const [students, setStudents] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    async function loadStudents() {
      await api.get("students").then(response => {
        const listFormated = response.data.map(e => ({
          value: e.id,
          label: e.name
        }));

        setStudents(listFormated);
      });
    }

    loadStudents();
  }, []);



  const filterStudents = (inputValue: string) => {
    return students.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };


  const loadOptions = (inputValue, callback) => {
      callback(filterStudents(inputValue));
  };

  return (
    <Container>
      <header>
        <h1>{edit ? "Edição de matrícula" : "Cadastro de matrícula"}</h1>
        <aside>
          <button
            className="return"
            type="button"
            onClick={() => alert(students.length)}
          >
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
        <Form id="registerForm" schema={schema}>
          <div>
            <h3>ALUNO</h3>
            <AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions={students} />
          </div>

          <div className="same-row">
            <div>
              <h3>PLANO</h3>
              <Input name="plan" type="text" />
            </div>

            <div>
              <h3>DATA DE INÍCIO</h3>
              <Input name="start_date" type="date" />
            </div>

            <div>
              <h3>DATA DE TÉRMINO</h3>
              <Input name="end_date" type="text" readOnly />
            </div>

            <div>
              <h3>VALOR FINAL</h3>
              <Input name="final_price" type="text" readOnly />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
