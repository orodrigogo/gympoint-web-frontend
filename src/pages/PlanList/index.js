import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdControlPoint } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import history from "../../services/history";

import { Container, Content } from "./styles";
import api from "../../services/api";
import { formatPrice } from "../../utils/ format";

export default function Plan() {
  const [plans, setPlans] = useState([]);

  async function loadPlans() {
    await api.get("plans").then(response => {
      setPlans(response.data);
    });
  }

  useEffect(() => {
    loadPlans();
  }, []);

  async function handleDelete(id) {
    Swal.fire({
      title: "Remover Plano",
      text: "Você realmente deseja remover este plano?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, remover!"
    }).then(async result => {
      if (result.value) {
        await api
          .delete(`plans/${id}`)
          .then(response => {
            if (response.data.deleted) {
              toast.success("Plano excluído com sucesso!");
              loadPlans();
            }
          })
          .catch(error => {
            toast.error(
              `Não foi possível excluír o plano. Detalhes: ${error.message}`
            );
          });
      }
    });
  }

  async function handleEdit(id) {
    history.push(`planregister/${id}`);
  }

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
                  <button
                    className="btnEdit"
                    type="button"
                    onClick={() => handleEdit(plan.id)}
                  >
                    editar
                  </button>
                  <button
                    className="btnDelete"
                    type="button"
                    onClick={() => handleDelete(plan.id)}
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
