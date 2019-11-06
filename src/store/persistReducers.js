import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: "gympoint", // chave do storage da aplicacao para não misturar com armazenamento de outras aplicações no navegador.
      storage, // Pega a estrategia de storage padrão para o ambiente em que estamos.
      whitelist: ["auth"] // Nomes dos Reducers que eu preciso armazenar informação. Os reducers que não estiver na whitelist, não serão persistidos.
    },
    reducers // Como segundo parametro do persistReducer, passo os reducers recebidos pelo parametro.
  );

  return persistedReducer;
};
