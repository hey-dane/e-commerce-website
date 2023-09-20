export function productsReducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return action.products;

    case "ADD_PRODUCT":
      return [...state, action.product];

    case "REMOVE_PRODUCT":
      return state.filter((product) => product.id !== action.id);

    case "UPDATE_PRODUCT":
      return state.map((product) =>
        product.id === action.product.id ? action.product : product
      );

    default:
      return state;
  }
}
