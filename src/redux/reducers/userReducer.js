import {
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const initialState = {
  loading: false,
  authenticated: false,
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
    default:
      return state;
  }
}
