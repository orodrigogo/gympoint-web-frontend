import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "../../store/modules/auth/actions";

import { Container } from "./styles";

import logo from "../../assets/logoheader.svg";

export default function Header() {
  const userName = useSelector(state => state.auth.name);
  const dispath = useDispatch();

  function handleSingOut() {
    dispath(signOut());
  }

  return (
    <Container>
      <nav>
        <Link to="/">
          <img src={logo} alt="Gympoint" />
        </Link>

        <ul>
          <li>
            <Link to="/home">ALUNOS</Link>
          </li>
          <li>
            <Link to="/plans">PLANOS</Link>
          </li>
          <li>
            <Link to="/matriculates">MATRÍCULAS</Link>
          </li>

          <li>
            <Link to="/orders">PEDIDOS DE AUXÍLIO</Link>
          </li>
        </ul>
      </nav>

      <aside>
        <span>{userName}</span>
        <button type="button" onClick={handleSingOut}>
          sair do sistema
        </button>
      </aside>
    </Container>
  );
}
