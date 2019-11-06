import React from "react";
import { MdControlPoint } from "react-icons/md";

import { Link } from "react-router-dom";

import { Container, Content } from "./styles";

export default function StudentList() {
  return (
    <Container>
      <header>
        <h1>Gerenciando alunos</h1>
        <aside>
          <Link to="/registerStudent">
            <MdControlPoint color="#FFF" fontSize={18} />
            CADASTRAR
          </Link>
          <input placeholder="Buscar aluno" />
        </aside>
      </header>
      <Content>
        <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cha Ji-Hun</td>
              <td>example@rocketseat.com.br</td>
              <td>20</td>
              <td>
                <button className="btnEdit" type="button">
                  editar
                </button>
              </td>
              <td>
                <button className="btnDelete" type="button">
                  apagar
                </button>
              </td>
            </tr>

            <tr>
              <td>Cha Ji-Hun</td>
              <td>example@rocketseat.com.br</td>
              <td>20</td>
              <td>
                <button className="btnEdit" type="button">
                  editar
                </button>
              </td>
              <td>
                <button className="btnDelete" type="button">
                  apagar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </Content>
    </Container>
  );
}
