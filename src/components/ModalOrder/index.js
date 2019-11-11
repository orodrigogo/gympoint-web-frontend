import React, { useState } from "react";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { Container } from "./styles";
import api from "../../services/api";

export default function ModalOrder({ payload }) {
  const [asnwer, setAsnwer] = useState();
  const [isLoad, setIsLoad] = useState(false);

  async function handleAsnwer() {
    setIsLoad(true);

    if (!asnwer) {
      toast.error("Você precisa digitar a resposta");
      setIsLoad(false);
      return;
    }

    await api
      .put(`students/help-orders/${payload.id}/answer`, { answer: asnwer })
      .then(() => {
        toast.success("Pedido de ajuda respondido!");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(error =>
        toast.error(
          `Não foi possível responder ao aluno. Detalhes: ${error.message}`
        )
      );
  }

  return (
    <Container>
      <form>
        <h1>PERGUNTA DO ALUNO</h1>
        <span>{payload.question}</span>
        <h1>SUA RESPOSTA</h1>
        <textarea
          name="aswear"
          onChange={e => setAsnwer(e.target.value)}
          value={asnwer}
        />
        <button type="button" onClick={() => handleAsnwer()} disabled={isLoad}>
          {isLoad ? "Respondendo..." : "Responder aluno"}
        </button>
      </form>
    </Container>
  );
}
