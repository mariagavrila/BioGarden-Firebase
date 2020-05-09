import { LOADING_PRODUCTS, SET_PRODUCTS, FAIL_PRODUCTS } from "../types";

const initialState = {
  isLoading: false,
  products: [],
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    case FAIL_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
