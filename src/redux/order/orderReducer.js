import {
    GET_ORDER
  } from "./orderActions"
  import { loadState } from "../localStorage";
  
  const initialState = {
    getOrder:[]
  };

  const persistedState = loadState()
  
  const orderReducer = (state = persistedState.order, actions) => {
    switch (actions.type) {

        case GET_ORDER:
        return {
          ...state,
          getOrder: actions.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default orderReducer;
  