import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_LOGOUT
} from "../types";

const initialState = {
  authenticated: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      console.log("authenticated");
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        error: action.error
      };
    case SET_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
