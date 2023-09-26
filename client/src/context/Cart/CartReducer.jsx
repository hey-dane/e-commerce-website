export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProductIndex = state.findIndex(
        (product) => product.id === action.product.id
      );

      if (existingProductIndex !== -1) {
        const newState = [...state];
        newState[existingProductIndex].quantity += action.product.quantity;
        return newState;
      } else {
        return [
          ...state,
          { ...action.product, quantity: action.product.quantity },
        ];
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
      return [];

    case "INITIALIZE_CART":
      return action.cart;

    case "UPDATE_CART":
      return [...action.cart];

    default:
      return state;
  }
};
