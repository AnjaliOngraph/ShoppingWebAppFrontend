import {
  TOTAL_AMOUNT,
  CART_ITEMS
} from "./cartActions";

import { loadState } from '../localStorage';

const persistedState = loadState();

const cartReducer = (state = persistedState.cart, actions) => {
  switch (actions.type) {


    case TOTAL_AMOUNT:
      return {
        ...state,
        totalAmount: actions.payload,
      };

      case CART_ITEMS:
        return {
          ...state,
          cartItems: actions.payload,
        };

    default:
      return state;
  }
};

export default cartReducer;
