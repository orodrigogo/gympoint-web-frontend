import React, { useState, useEffect } from "react";
import { MdControlPoint, MdArrowBack } from "react-icons/md";
import { Input } from "@rocketseat/unform";
import { formatPrice } from "../../utils/ format";
import { addMonths, format, parseISO } from 'date-fns';
import { toast } from "react-toastify";

import AsyncSelect from "react-select/async";

import api from "../../services/api";
import history from '../../services/history';

import { Container, Content } from "./styles";

export default function Matriculate({ match }) {

  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [noteMsg, setNoteMsg] = useState();
  const [dateSelected, setDateSelected] = useState(format(new Date(), "yyy-MM-dd"));
  const [edit, setEdit] = useState(false);
  const [endDate, setEndDate] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [planSelected, setPlanSelected] = useState();
  //é um objeto porque guardo label = nome e value = id.
  const [studentSelected, setStudentSelected] = useState([]);


  async function loadData() {

    await api.get("students").then(response => {
      const listFormated = response.data.map(e => ({
        value: e.id,
        label: e.name
      }));

      setStudents(listFormated);

    }).then(
      await api.get("plans").then(response => {
        setPlans(response.data);
      })
    )
    }

  useEffect(() => {
    loadData();

    if(match.params.id){
      setEdit(true);
      loadDatasForEdit();
    }
  }, []);

  async function loadDatasForEdit(){
    await api.get(`registrations/${match.params.id}`).then(response => {
      setStudentSelected(response.data.student_id)
      setDateSelected(format(parseISO(response.data.start_date), "yyyy-MM-dd"))
      setPlanSelected(response.data.plan_id)
    });
  }


  const filterStudents = (inputValue: string) => {
    return students.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptionsStudent = (inputValue, callback) => {
      callback(filterStudents(inputValue));
  };




  useEffect(() => {

    if(planSelected && plans){

          //Primeiro localizo o plano.
          const planIndex_selected = plans.findIndex(plan => plan.id == planSelected)



          setEndDate(format(addMonths(new Date(dateSelected), plans[planIndex_selected].duration), "dd/MM/yyyy"));
          setTotalPrice(plans[planIndex_selected].price * plans[planIndex_selected].duration);

          setNoteMsg(`O plano selecionado tem duração de ${plans[planIndex_selected].duration} meses com mensalidades de ${formatPrice(plans[planIndex_selected].price)}.`);
    }

  },[planSelected, dateSelected])

  async function handleRegister(){
    if(!studentSelected || !planSelected || !students){
          toast.warning("Lembre-se de selecionar o aluno, o plano e a data de início!");
    }else{
        await api.post(`registrations/${planSelected}/${studentSelected.value}?start_date=${dateSelected}`).then(() => {
            toast.success("Matrícula efetivada com sucesso!")
            history.goBack()
        }
        ).catch(error => {
          toast.error(error)
          console.tron.log(error)})
    }
  }

async function handleSave(){
  if(!studentSelected || !planSelected || !students){
        toast.warning("Lembre-se de selecionar o aluno, o plano e a data de início!");
  }else{
      await api.put(`registrations/${match.params.id}`,{start_date: dateSelected, student_id: studentSelected, plan_id: planSelected }).then(() => {
          toast.success("Matrícula atualizada com sucesso!")
          history.goBack()
      }
      ).catch(error => {
        toast.error(error)
        console.tron.log(error)})
  }
}

  return (
    <Container>

      <header>
        <h1>{edit ? "Edição de matrícula" : "Cadastro de matrícula"}</h1>
        <aside>
          <button
            className="return"
            type="button"
            onClick={() =>  history.goBack()}
          >
            <MdArrowBack color="#FFF" fontSize={18} />
            VOLTAR
          </button>
          <button type="submit" onClick={edit ? handleSave : handleRegister}>
            <MdControlPoint color="#FFF" fontSize={18} />
            SALVAR
          </button>
        </aside>
      </header>
      <Content>
        <form>
          <div>
            <h3>ALUNO</h3>
            <AsyncSelect cacheOptions loadOptions={loadOptionsStudent} defaultOptions={students} placeholder="Pesquise e selecione um aluno..." onChange={(option) => setStudentSelected(option.value)} value={students.filter(option => option.value === studentSelected)} />
          </div>

          <div className="same-row">
            <div>
              <h3>PLANO</h3>
              <select onChange={e => setPlanSelected(e.target.value)} value={planSelected}>
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

        </form>
      </Content>
    </Container>
  );
}
