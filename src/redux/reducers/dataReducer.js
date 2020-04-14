import { SET_USERS } from "../types";

const initialState = {
  users: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        usersUpdate: true,
      };
    default:
      return state;
  }
}
