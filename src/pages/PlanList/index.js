import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdControlPoint } from "react-icons/md";

import { Container, Content } from "./styles";
import api from "../../services/api";
import { formatPrice } from "../../utils/ format";

export default function Plan() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      await api.get("plans").then(response => {
        setPlans(response.data);
      });
    }

    loadPlans();
  }, []);

  return (
    <Container>
      <header>
        <h1>Gerenciando planos</h1>
        <aside>
          <Link to="/planregister">
            <MdControlPoint color="#FFF" fontSize={18} />
            CADASTRAR
          </Link>
        </aside>
      </header>
      <Content>
        <table>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR P/ MÊS</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>{plan.duration}</td>
                <td>{formatPrice(plan.price)}</td>
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
