import React, { useEffect, useState } from "react";

import { Container, Content } from "./styles";

import api from "../../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function loadOrders() {
      await api
        .get("pendingquestions")
        .then(response => setOrders(response.data));
    }

    loadOrders();
  }, []);
  return (
    <Container>
      <header>
        <h1>Pedidos de auxílio</h1>
      </header>
      <Content>
        <table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr>
                <td>{order.student.name}</td>
                <td>
                  <button className="btnEdit" type="button">
                    responder
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
