import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdControlPoint, MdCheck } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { toast } from "react-toastify";
import history from "../../services/history";

import { Container, Content } from "./styles";

import api from "../../services/api";
import { formatPrice } from "../../utils/ format";

export default function MatriculateList() {
  const [registers, setRegisters] = useState([]);

  useEffect(() => {
    async function loadRegisters() {
      await api.get("registrations").then(response => {
        setRegisters(response.data);
      });
    }

    loadRegisters();
  }, []);

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
                <td>{register.start_date}</td>
                <td>{register.end_date}</td>
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
                  <button className="btnDelete" type="button">
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
