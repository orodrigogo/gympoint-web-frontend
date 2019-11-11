import React, { useEffect, useState } from "react";

import { Container, Content } from "./styles";

import api from "../../services/api";
import Modal from "../../components/ModalOrder";

export default function Orders() {
  const [openModal, setOpenModal] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      await api
        .get("pendingquestions")
        .then(response => setOrders(response.data));
    }

    loadOrders();
  }, []);

  function handleShowModal(payload) {
    setOpenModal({ open: !openModal.open, payload });
  }
  return (
    <>
      {openModal.open && <Modal payload={openModal.payload} />}
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
                    <button
                      className="btnEdit"
                      type="button"
                      onClick={() => handleShowModal(order)}
                    >
                      responder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Content>
      </Container>
    </>
  );
}
