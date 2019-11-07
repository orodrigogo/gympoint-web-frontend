import produce from "immer";

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  name: null
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@auth/SIGN_IN_REQUEST": {
        draft.loading = true;
        break;
      }
      // Manipulação quando a Action @auth/SIGN_IN_SUCCESS for disparada.
      case "@auth/SIGN_IN_SUCCESS": {
        draft.token = action.payload.token;
        draft.name = action.payload.user.name;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case "@auth/SIGN_FAILURE": {
        draft.loading = false;
        break;
      }
      case "@auth/SIGN_OUT": {
        draft.token = null;
        draft.name = null;
        draft.signed = false;
        break;
      }
      default:
        return state;
    }
  });
}
