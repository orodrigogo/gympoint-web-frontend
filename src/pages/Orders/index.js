import React, { useEffect, useState } from "react";
import { formatRelative, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";

import { Container, Content, PageActions } from "./styles";

import api from "../../services/api";
import Modal from "../../components/ModalOrder";

export default function Orders() {
  const [openModal, setOpenModal] = useState([]);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);

  async function loadOrders() {
    await api
      .get(`pendingquestions?page=${page}`)
      .then(response => setOrders(response.data));
  }

  useEffect(() => {
    loadOrders();
  }, [page]);

  function handleShowModal(payload) {
    setOpenModal({ open: !openModal.open, payload });
  }

  function handlePage(action) {
    setPage(action === "back" ? page - 1 : page + 1);
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
                  <td>
                    {order.student.name} -{" "}
                    {formatRelative(parseISO(order.createdAt), new Date(), {
                      locale: pt
                    })}
                  </td>
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
        <PageActions>
          <button
            type="button"
            onClick={() => handlePage("back")}
            disabled={page < 2}
          >
            Anterior
          </button>
          <span>Página {page}</span>
          <button type="button" onClick={() => handlePage("next")}>
            Próximo
          </button>
        </PageActions>
      </Container>
    </>
  );
}
