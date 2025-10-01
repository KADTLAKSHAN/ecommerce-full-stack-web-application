import { selectUserCheckoutAddress } from "../actions";

const initialState = {
  user: null,
  address: [],
  clientSecret: null,
  selectedUserCheckoutAddress: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "LOG_OUT":
      return {
        user: null,
        address: null,
      };

    case "SELECT_CHECKOUT_ADDRESS":
      return {
        ...state,
        selectedUserCheckoutAddress: action.payload,
      };

    case "REMOVE_CHECKOUT_ADDRESS":
      return {
        ...state,
        selectUserCheckoutAddress: null,
      };

    case "USER_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };

    case "CLIENT_SECRET":
      return {
        ...state,
        clientSecret: action.payload,
      };

    case "REMOVE_CLIENT_SECRET_ADDRESS":
      return {
        ...state,
        clientSecret: null,
        selectUserCheckoutAddress: null,
      };

    default:
      return state;
  }
};
