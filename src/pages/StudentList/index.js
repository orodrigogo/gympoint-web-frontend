import React, { useEffect, useState } from "react";
import { MdControlPoint, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import history from "../../services/history";

import { Container, Content, PageActions } from "./styles";

import api from "../../services/api";

export default function StudentList() {
  const [searchName, setSearchName] = useState();
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);

  async function searchStudents() {
    const response = await api.get(
      searchName
        ? `students?searchName=${searchName}&page=${page}`
        : `students?page=${page}`
    );

    setStudents(response.data);
  }

  useEffect(() => {
    searchStudents();
  }, [searchName, page]);

  async function handleDelete(id) {
    Swal.fire({
      title: "Remover Aluno",
      text: "Você realmente deseja remover este aluno?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, remover!"
    }).then(async result => {
      if (result.value) {
        await api
          .delete(`students/${id}`)
          .then(response => {
            if (response.data.deleted) {
              toast.success("Usuário excluído com sucesso!");
              setSearchName("");
            }
          })
          .catch(error => {
            toast.error(
              `Não foi possível excluír o aluno. Detalhes: ${error.message}`
            );
          });
      }
    });
  }

  async function handleEdit(id) {
    history.push(`studentregister/${id}`);
  }

  function handlePage(action) {
    setPage(action === "back" ? page - 1 : page + 1);
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando alunos</h1>
        <aside>
          <Link to="/studentregister">
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
                  <button
                    className="btnEdit"
                    type="button"
                    onClick={() => handleEdit(student.id)}
                  >
                    editar
                  </button>
                  <button
                    className="btnDelete"
                    type="button"
                    onClick={() => handleDelete(student.id)}
                  >
                    apagar
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
  );
}
