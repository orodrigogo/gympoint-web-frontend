import React, { useState, useEffect } from "react";
import { MdControlPoint, MdArrowBack } from "react-icons/md";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";
import { formatPrice } from "../../utils/ format";
import { addMonths, format } from 'date-fns';
import { toast } from "react-toastify";

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
  const [plans, setPlans] = useState([]);
  const [noteMsg, setNoteMsg] = useState();
  const [dateSelected, setDateSelected] = useState(format(new Date(), "yyy-MM-dd"));
  const [edit, setEdit] = useState(false);
  const [endDate, setEndDate] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [planSelected, setPlanSelected] = useState();

  useEffect(() => {
    async function loadData() {

      await api.get("students").then(response => {
        const listFormated = response.data.map(e => ({
          value: e.id,
          label: e.name
        }));

        setStudents(listFormated);
      });


        await api.get("plans").then(response => {
          setPlans(response.data);
        });

      }

    loadData();

  }, []);



  const filterStudents = (inputValue: string) => {
    return students.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptionsStudent = (inputValue, callback) => {
      callback(filterStudents(inputValue));
  };




  useEffect(() => {

    if(planSelected){

          //Primeiro localizo o plano.
          const planIndex_selected = plans.findIndex(plan => plan.id == planSelected)



          setEndDate(format(addMonths(new Date(dateSelected), plans[planIndex_selected].duration), "dd/MM/yyyy"));
          setTotalPrice(plans[planIndex_selected].price * plans[planIndex_selected].duration);

          setNoteMsg(`O plano selecionado tem duração de ${plans[planIndex_selected].duration} meses com mensalidades de ${formatPrice(plans[planIndex_selected].price)}.`);
    }

  },[planSelected, dateSelected])





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
            <AsyncSelect cacheOptions loadOptions={loadOptionsStudent} defaultOptions={students} placeholder="Pesquise e selecione um aluno..." />
          </div>

          <div className="same-row">
            <div>
              <h3>PLANO</h3>
              <select onChange={e => setPlanSelected(e.target.value)}>
              <option value="" disabled selected>Selecione um plano</option>
                {plans.map(p => (
                <option value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>

            <div>
              <h3>DATA DE INÍCIO</h3>
              <Input name="start_date" type="date" onChange={e => setDateSelected(e.target.value)} value={dateSelected}/>
            </div>

            <div>
              <h3>DATA DE TÉRMINO</h3>
              <Input name="end_date" type="text" readOnly value={endDate} />
            </div>

            <div>
              <h3>VALOR FINAL</h3>
              <Input name="final_price" type="text" readOnly value={totalPrice ? formatPrice(totalPrice) : "" }/>
            </div>
          </div>

          <span className="note">{noteMsg}</span>




        </Form>
      </Content>
    </Container>
  );
}
