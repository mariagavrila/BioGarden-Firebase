import {
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_LOGOUT,
  CLEAR_ERRORS,
  LOADING_USERS,
  USERS_LOADED,
  FAIL_USERS,
  MODAL_ERRORS,
  MODAL_LOADING,
  FAIL_MODAL,
} from "../types";

const initialState = {
  loading: false,
  authenticated: false,
  loadingUsers: false,
  users: [],
  error: "",
  modalErrors: {},
  modalLoading: false,
  modalFail: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: "",
      };
    case SET_LOGOUT:
      return initialState;
    case LOADING_USERS:
      return {
        ...state,
        loadingUsers: true,
      };
    case USERS_LOADED:
      return {
        ...state,
        loadingUsers: false,
        error: "",
        users: action.payload,
      };
    case FAIL_USERS:
      return {
        ...state,
        loadingUsers: false,
        error: action.payload,
      };
    case MODAL_LOADING:
      return {
        ...state,
        modalLoading: true,
      };
    case MODAL_ERRORS:
      return {
        ...state,
        modalLoading: false,
        modalErrors: action.payload,
      };
    case FAIL_MODAL:
      return {
        ...state,
        modalLoading: false,
        modalFail: action.payload,
      };
    default:
      return { ...state };
  }
}
