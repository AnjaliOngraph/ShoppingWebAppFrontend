import { ADDRESS_ID, GET_ADDRESS } from "./addressActions";
import { loadState } from '../localStorage';

const persistedState = loadState();

const addressReducer = (state=persistedState.address, actions) => {
  switch (actions.type) {
    case ADDRESS_ID:
      return {
        ...state,
        addressId: actions.payload,
      };

    case GET_ADDRESS:
      return {
        ...state,
        getAddress: actions.payload,
      };

    default:
      return state;
  }
};

export default addressReducer;
