import { LOADING_PRODUCTS, SET_PRODUCTS, FAIL_PRODUCTS } from "../types";
import axios from "axios";

let proxy = "https://europe-west1-biogarden.cloudfunctions.net/api";

// Obtener todos los productos
export const getProducts = () => (dispatch) => {
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

// Obtener todos los productos
export const addNewProduct = () => (dispatch) => {
  //   dispatch({ type: LOADING_PRODUCTS });
  //   return axios
  //     .get(`${proxy}/mercado`)
  //     .then((res) => {
  //       dispatch({ type: SET_PRODUCTS, payload: res.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       dispatch({
  //         type: FAIL_PRODUCTS,
  //         payload: "Error interno. ¡Inténtelo más tarde!",
  //       });
  //     });
};
