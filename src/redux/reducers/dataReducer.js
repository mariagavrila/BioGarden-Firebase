import {
  LOADING_PRODUCTS,
  SET_PRODUCTS,
  FAIL_PRODUCTS,
  ADDING_PRODUCT,
  PRODUCT_ADDED,
  FAIL_ADD_PRODUCT,
  UPDATING_PRODUCT,
  PRODUCT_UPDATED,
  FAIL_UPDATE_PRODUCT,
  DELETING_PRODUCT,
  PRODUCT_DELETED,
  FAIL_DELETE_PRODUCT,
  CLEAR_PRODUCT,
  FILL_CHECK_PRODUCTS,
  REGISTERING,
  CHECKOUT_REGISTERED,
  FAIL_CHECKOUT,
  CLEAR_CHECKOUT,
} from "../types";

const initialState = {
  isLoading: false,
  products: [],
  error: "",
  isAdding: false,
  msgAdd: "",
  failAdd: false,
  isDeleting: false,
  msgDelete: "",
  failDelete: false,
  checkProducts: [],
  isRegistering: false,
  checkoutRegistered: "",
  failCheckout: false,
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
    case ADDING_PRODUCT:
      return {
        ...state,
        isAdding: true,
        failAdd: false,
      };
    case PRODUCT_ADDED:
      return {
        ...state,
        isAdding: false,
        failAdd: false,
        msgAdd: action.payload,
      };
    case FAIL_ADD_PRODUCT:
      return {
        ...state,
        isAdding: false,
        failAdd: true,
        msgAdd: action.payload,
      };
    case DELETING_PRODUCT:
      return {
        ...state,
        failDelete: false,
        isDeleting: true,
      };
    case PRODUCT_DELETED:
      return {
        ...state,
        isDeleting: false,
        failDelete: false,
        msgDelete: action.payload,
      };
    case FAIL_PRODUCTS:
      return {
        ...state,
        isDeleting: false,
        msgDelete: action.payload,
        failDelete: true,
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        msgAdd: "",
      };
    case FILL_CHECK_PRODUCTS:
      state.checkProducts.push(action.payload);
      return {
        ...state,
      };
    case REGISTERING:
      return {
        ...state,
        failCheckout: false,
        isRegistering: true,
      };
    case CHECKOUT_REGISTERED:
      return {
        ...state,
        failCheckout: false,
        isRegistering: false,
        checkoutRegistered: action.payload,
      };
    case FAIL_CHECKOUT:
      return {
        ...state,
        failCheckout: true,
        isRegistering: false,
        checkoutRegistered: action.payload,
      };
    case CLEAR_CHECKOUT:
      return {
        ...state,
        checkoutRegistered: "",
        checkProducts: [],
      };
    default:
      return state;
  }
}
