import {
  LOADING_PRODUCTS,
  SET_PRODUCTS,
  FAIL_PRODUCTS,
  ADDING_PRODUCT,
  PRODUCT_ADDED,
  FAIL_ADD_PRODUCT,
} from "../types";
import axios from "axios";

let proxy = "https://europe-west1-biogarden.cloudfunctions.net/api";

// Obtener todos los productos
export const getProducts = () => (dispatch) => {
  console.log("get");
  dispatch({ type: LOADING_PRODUCTS });
  return axios
    .get(`${proxy}/mercado`)
    .then((res) => {
      dispatch({ type: SET_PRODUCTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: FAIL_PRODUCTS,
        payload: "Error interno. ¡Inténtelo más tarde!",
      });
    });
};

// Añadir un producto
export const addNewProduct = (data) => (dispatch) => {
  dispatch({ type: ADDING_PRODUCT });
  return axios
    .post(`${proxy}/mercado`, data)
    .then((res) => {
      dispatch({ type: PRODUCT_ADDED, payload: res.data.msg });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: FAIL_ADD_PRODUCT,
        payload: "Error interno. ¡Inténtelo más tarde!",
      });
    });
};
// Actualizar un producto
export const updateProduct = () => (dispatch) => {
  dispatch({ type: LOADING_PRODUCTS });
  return axios
    .get(`${proxy}/mercado`)
    .then((res) => {
      dispatch({ type: SET_PRODUCTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: FAIL_PRODUCTS,
        payload: "Error interno. ¡Inténtelo más tarde!",
      });
    });
};
