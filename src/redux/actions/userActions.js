import {
  SET_USER,
  SET_USERS,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_LOGOUT,
} from "../types";
import axios from "axios";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

let proxy = "http://localhost:8080";

export const loginUser = (email, password) => (dispatch) => {
  let data = { email: email, password: password };

  return axios
    .post(proxy, data)
    .then((res) => {
      let data = res.data;
      if (res.data.success) {
        localStorage.setItem("user", res.data.token);
        history.push("/");
        dispatch({ type: SET_AUTHENTICATED });
      } else {
        dispatch({
          type: SET_UNAUTHENTICATED,
          error: data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const logoutUser = () => (dispatch) => {
  dispatch({ type: SET_LOGOUT });
  localStorage.removeItem("user");
};
// Get all users
export const getUsersData = (usersData) => {
  let users = [];
  let data = {
    token: localStorage.getItem("user"),
    data: usersData,
  };
  return axios
    .post(`${proxy}/users`, data)
    .then((res) => {
      let data = res.data;
      data.forEach((element) => {
        users.push(element);
      });
      return users;
    })
    .catch((err) => {
      console.log(err);
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
export const addUser = (data) => {
  let usersData = {
    token: localStorage.getItem("user"),
    data: data.state,
  };

  return axios
    .post(`${proxy}/users/add`, usersData)
    .then((res) => {
      console.log(res);
      return {
        msg: res.data,
      };
    })
    .catch((err) => {
      console.log(err);
    });
};
//localhost:8080/users/add

//test
const getRumanitos = () => {
  if ("jose" != "gilipollas") return "rumanitos";
};
