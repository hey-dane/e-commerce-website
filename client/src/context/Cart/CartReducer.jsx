export const cart = {
  items: [],
  cartQuantity: 0,
};

function computeCartQuantity(items) {
  return items.reduce((total, product) => total + product.quantity, 0);
}

export const cartReducer = (state, action) => {
  console.log("Current State:", state);
  console.log("Received Action:", action);
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProductIndex = state.items.findIndex(
        (product) => product.id === action.product.id
      );

      let updatedItems;
      if (existingProductIndex !== -1) {
        updatedItems = [...state.items];
        updatedItems[existingProductIndex].quantity += action.product.quantity;
      } else {
        updatedItems = [
          ...state.items,
          {
            ...action.product,
            quantity:
              typeof action.product.quantity === "number"
                ? action.product.quantity
                : 1,
          },
        ];
      }

      return {
        items: updatedItems,
        cartQuantity: computeCartQuantity(updatedItems),
      };
    case "UPDATE_CART_PRODUCT":
      const updatedProducts = state.items.map((product) =>
        product.id === action.productId
          ? { ...product, quantity: action.newQuantity }
          : product
      );
      return {
        items: updatedProducts,
        cartQuantity: computeCartQuantity(updatedProducts),
      };

    case "REMOVE_FROM_CART":
      const remainingItems = state.items.filter(
        (product) => product.id !== action.productId
      );
      return {
        items: remainingItems,
        cartQuantity: computeCartQuantity(remainingItems),
      };

    case "EMPTY_CART":
      return {
        items: [],
        cartQuantity: 0,
      };

    case "INITIALIZE_CART":
      const initializedItems = action.cart.map((item) => ({
        ...item,
        quantity:
          typeof item.quantity === "number" && item.quantity > 0
            ? item.quantity
            : 1,
      }));

      return {
        items: initializedItems,
        cartQuantity: computeCartQuantity(initializedItems),
      };

    default:
      return state;
  }
};
