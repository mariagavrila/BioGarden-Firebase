import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_LOGOUT,
  LOADING_USER,
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
} from "../types";
import axios from "axios";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

let proxy = "https://europe-west1-biogarden.cloudfunctions.net/api";

export const loginUser = (email, password) => (dispatch) => {
  let data = { email: email, password: password };
  dispatch({ type: LOADING_USER });
  return axios
    .post(`${proxy}/login`, data)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      let id = res.data.token;
      if (id) {
        dispatch({ type: SET_AUTHENTICATED });
        //history.push("/");
      } else {
        dispatch({
          type: SET_UNAUTHENTICATED,
          error: res.data.error,
        });
      }
    })
    .catch(() => {
      dispatch({
        type: SET_UNAUTHENTICATED,
        error: "Error interno. Inténtelo más tarde!",
      });
    });
};
export const logoutUser = () => (dispatch) => {
  dispatch({ type: SET_LOGOUT });
  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem("user");
};
// Obtener los usuarios filtrados
export const getUsersData = (data) => (dispatch) => {
  dispatch({ type: LOADING_USERS });
  return axios
    .post(`${proxy}/users`, data)
    .then((res) => {
      dispatch({ type: USERS_LOADED, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: FAIL_USERS,
        payload: "Error interno. ¡Inténtelo más tarde!",
      });
    });
};
// Get one user
export const getUserData = (id) => {
  return axios
    .get(`${proxy}/users/${id}`)
    .then((res) => {
      let data = res.data;
      console.log(data);
      return {
        name: data.name,
        lastName: data.lastName,
        dni: data.dni,
        consum: data.ludicOrThepeutic,
        startInsc: data.startInscriptionDate,
        endInsc: data.endInscriptionDate,
      };
    })
    .catch((err) => {
      console.log(err);
    });
};
// Post one user
export const addUser = (data) => (dispatch) => {
  dispatch({ type: MODAL_LOADING });
  return axios
    .post(`${proxy}/user`, data)
    .then((res) => {
      dispatch({ type: USER_ERRORS, payload: res.data.errors });
      dispatch({ type: USER_HELPERS, payload: res.data.mensaje });
      dispatch(
        getUsersData({
          nombre: "",
          apellido: "",
          dni: "",
          nsocio: "",
        })
      );
    })
    .catch(() => {
      dispatch({
        type: FAIL_MODAL,
        payload: "Error interno. ¡Inténtelo más tarde!",
      });
    });
};
// Eliminar un usuario
export const deleteUser = (id) => (dispatch) => {
  dispatch({ type: DELETING_USER });
  return axios
    .post(`${proxy}/user/${id}`)
    .then(() => {
      dispatch(
        getUsersData({
          nombre: "",
          apellido: "",
          dni: "",
          nsocio: "",
        })
      );
      dispatch({
        type: USER_DELETED,
        payload: "Usuario eliminado correctamente.",
      });
    })
    .catch(() => {
      dispatch({
        type: FAIL_DELETE,
        payload: "Error interno. ¡Inténtelo más tarde!",
      });
    });
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("user", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
