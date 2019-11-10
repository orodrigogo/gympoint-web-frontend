import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { MdControlPoint } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import history from "../../services/history";

import { Container, Content } from "./styles";

import api from "../../services/api";
import { formatPrice } from "../../utils/ format";

export default function MatriculateList() {
  const [registers, setRegisters] = useState([]);

  async function loadRegisters() {
    await api.get("registrations").then(response => {
      setRegisters(
        response.data.map(item => ({
          ...item,
          startDateFormatted: format(
            parseISO(item.start_date),
            "d 'de' MMMM 'de' yyyy",
            {
              locale: pt
            }
          ),
          endDateFormatted: format(
            parseISO(item.end_date),
            "d 'de' MMMM 'de' yyyy",
            {
              locale: pt
            }
          )
        }))
      );
    });
  }

  useEffect(() => {
    loadRegisters();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Deseja realmente excluír essa matrícula?")) {
      await api
        .delete(`registrations/${id}`)
        .then(response => {
          if (response.data.deleted) {
            toast.success("Matrícula removida com sucesso!");
            loadRegisters();
          }
        })
        .catch(error => {
          toast.error(
            `Não foi possível remover a matrícula. Detalhes: ${error.message}`
          );
        });
    }
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando matrículas</h1>
        <aside>
          <Link to="/matriculateregister">
            <MdControlPoint color="#FFF" fontSize={18} />
            CADASTRAR
          </Link>
        </aside>
      </header>
      <Content>
        <table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INÍCIO</th>
              <th>TÉRMINO</th>
              <th>ATIVA</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {registers.map(register => (
              <tr isActive>
                <td>{register.student.name}</td>
                <td>{register.plan.title}</td>
                <td>{register.startDateFormatted}</td>
                <td>{register.endDateFormatted}</td>
                <td>
                  <IoIosCheckmarkCircle
                    fontSize={22}
                    color={register.is_active ? "#42cb59" : "#999"}
                  />
                </td>
                <td>
                  <button className="btnEdit" type="button">
                    editar
                  </button>
                  <button
                    className="btnDelete"
                    type="button"
                    onClick={() => handleDelete(register.id)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Container>
  );
}
