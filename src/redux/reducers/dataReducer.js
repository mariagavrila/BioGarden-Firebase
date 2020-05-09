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
} from "../types";

const initialState = {
  isLoading: false,
  products: [],
  error: "",
  isAdding: false,
  msg: "",
  failAdd: false,
  isUpdating: false,
  msg: "",
  failUpdate: false,
  isDeleting: false,
  msg: "",
  failDelete: false,
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
      };
    case PRODUCT_ADDED:
      return {
        ...state,
        isAdding: false,
        msg: action.payload,
      };
    case FAIL_ADD_PRODUCT:
      return {
        ...state,
        isAdding: false,
        msg: action.payload,
      };
    case UPDATING_PRODUCT:
      return {
        ...state,
        isUpdating: true,
      };
    case PRODUCT_UPDATED:
      return {
        ...state,
        isUpdating: false,
        msg: action.payload,
      };
    case FAIL_UPDATE_PRODUCT:
      return {
        ...state,
        isUpdating: false,
        msg: action.payload,
      };
    case DELETING_PRODUCT:
      return {
        ...state,
        isDeleting: true,
      };
    case PRODUCT_DELETED:
      return {
        ...state,
        isDeleting: false,
        msg: action.payload,
      };
    case FAIL_PRODUCTS:
      return {
        ...state,
        isDeleting: false,
        msg: action.payload,
        failDelete: true,
      };
    default:
      return state;
  }
}
