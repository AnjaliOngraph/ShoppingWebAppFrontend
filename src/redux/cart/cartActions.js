export const TOTAL_AMOUNT = "TOTAL_AMOUNT";
export const CART_ITEMS = "CART_ITEMS";

export const TotalAmount = (payload) => {
  return {
    type: TOTAL_AMOUNT,
    payload
  };
};

export const GetCartItems = (payload) => {
  return {
    type: CART_ITEMS,
    payload
  };
};


