import React, { useEffect, useState } from "react";
import { MdControlPoint, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";

import { Container, Content } from "./styles";

import api from "../../services/api";

export default function StudentList() {
  const [searchName, setSearchName] = useState();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function searchStudents() {
      const response = await api.get(
        searchName ? `students?searchName=${searchName}` : "students"
      );

      setStudents(response.data);
    }

    searchStudents();

    console.tron.log(students);
  }, [searchName]);

  return (
    <Container>
      <header>
        <h1>Gerenciando alunos</h1>
        <aside>
          <Link to="/registerStudent">
            <MdControlPoint color="#FFF" fontSize={18} />
            CADASTRAR
          </Link>
          <div>
            <MdSearch color="#999" fontSize={18} />
            <input
              placeholder="Buscar aluno"
              onChange={e => setSearchName(e.target.value)}
            />
          </div>
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
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
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
