import {
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_LOGOUT,
  CLEAR_ERRORS,
  LOADING_USERS,
  USERS_LOADED,
  FAIL_USERS,
} from "../types";

const initialState = {
  loading: false,
  authenticated: false,
  loadingUsers: false,
  users: [],
  error: "",
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
        users: action.payload,
      };
    case FAIL_USERS:
      return {
        ...state,
        loadingUsers: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
