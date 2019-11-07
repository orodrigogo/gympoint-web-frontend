import { toast } from "react-toastify";
import { takeLatest, call, put, all } from "redux-saga/effects";
import history from "../../../services/history";
import api from "../../../services/api";
import { signInSucess, signFailure } from "./actions";

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, "sessions", { email, password });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSucess(token, user));

    history.push("/home");
  } catch (error) {
    toast.error("Falha na autenticação, verifique seus dados");
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    // Caso o usuário dê F5 ou atualize a pagina, recuperamos o token e Armazenando no axios, no cabecalho das requisicoes o token do usuário.
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("persist/REHYDRATE", setToken)
]);
