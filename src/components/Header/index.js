import React from "react";
import { Link } from "react-router-dom";

import { Container } from "./styles";

import logo from "../../assets/logoheader.svg";

export default function Header() {
  return (
    <Container>
      <nav>
        <Link to="/">
          <img src={logo} alt="Gympoint" />
        </Link>

        <ul>
          <li>
            <Link to="/student">ALUNOS</Link>
          </li>
          <li>
            <Link to="/plans">PLANOS</Link>
          </li>
          <li>
            <Link to="/registers">MATRÍCULAS</Link>
          </li>

          <li>
            <Link to="/orders">PEDIDOS DE AUXÍLIO</Link>
          </li>
        </ul>
      </nav>

      <aside>
        <span>Rodrigo Gonçalves</span>
        <button type="button">sair do sistema</button>
      </aside>
    </Container>
  );
}
