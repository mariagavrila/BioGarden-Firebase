import {
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_LOGOUT,
  CLEAR_ERRORS,
  LOADING_USERS,
  USERS_LOADED,
  FAIL_USERS,
  MODAL_LOADING,
  FAIL_MODAL,
  USER_ERRORS,
  USER_HELPERS,
  DELETING_USER,
  USER_DELETED,
  FAIL_DELETE,
  DATA_LOADED,
  DATA_LOADING,
  FAIL_DATA,
  ADD_USER,
  CLEAR_USER,
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
  validUser: {
    name: false,
    lastName: false,
    birthDate: false,
    dni: false,
    email: false,
    serverStatus: false,
  },
  helperUser: {
    name: "",
    lastName: "",
    birthDate: "",
    dni: "",
    email: "",
    serverStatus: "",
  },
  deleting: false,
  deleted: "",
  resDelete: "",
  dataLoading: false,
  userData: {
    name: "",
    lastName: "",
    dni: "",
    email: "",
    birthDate: "",
    address: "",
    zip: "",
    city: "",
    phone: "",
    observation: "",
  },
  failData: "",
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
    case FAIL_MODAL:
      return {
        ...state,
        modalLoading: false,
        modalFail: action.payload,
      };
    case USER_ERRORS:
      return {
        ...state,
        modalLoading: false,
        validUser: {
          ...state.validUser,
          ...action.payload,
        },
      };
    case USER_HELPERS:
      return {
        ...state,
        helperUser: {
          ...state.helperUser,
          ...action.payload,
        },
      };
    case DELETING_USER:
      return {
        ...state,
        deleting: true,
      };
    case USER_DELETED:
      return {
        ...state,
        deleting: false,
        deleted: true,
        resDelete: action.payload,
      };
    case FAIL_DELETE:
      return {
        ...state,
        deleting: false,
        deleted: false,
        resDelete: action.payload,
      };
    case DATA_LOADING:
      return {
        ...state,
        dataLoading: true,
      };
    case DATA_LOADED:
      return {
        ...state,
        dataLoading: false,
        userData: action.payload,
      };
    case FAIL_DATA:
      return {
        ...state,
        dataLoading: false,
        failData: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      };
    case CLEAR_USER:
      return {
        ...state,
        userData: {
          ...initialState.userData,
        },
        validUser: {
          ...initialState.validUser,
        },
        helperUser: {
          ...initialState.helperUser,
        },
      };
    default:
      return { ...state };
  }
}
