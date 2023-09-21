export const cartReducer = (state, action) => {
  console.log("Action dispatched:", action.type, "with payload:", action);

  switch (action.type) {
    case "ADD_TO_CART":
      const existingProductIndex = state.findIndex(
        (product) => product.id === action.product.id
      );

      if (existingProductIndex !== -1) {
        const newState = [...state];
        newState[existingProductIndex].quantity += 1;
        return newState;
      } else {
        const newState = [...state, { ...action.product, quantity: 1 }];
        return newState;
      }

    case "UPDATE_CART_PRODUCT":
      return state.map((product) =>
        product.id === action.productId
          ? { ...product, quantity: action.newQuantity }
          : product
      );

    case "REMOVE_FROM_CART":
      return state.filter((product) => product.id !== action.productId);

    case "EMPTY_CART":
      console.log("EMPTY_CART action received. Emptying the cart.");
      return [];

    case "INITIALIZE_CART":
      return action.cart;

    case "UPDATE_CART":
      return [...action.cart];

    default:
      return state;
  }
};
