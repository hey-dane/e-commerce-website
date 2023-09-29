import { computeCartQuantity } from "./CartContext";

export const cartStart = {
  products: [],
  cartQuantity: 0,
  initialized: false,
};

export const cartReducer = (state = cartStart, action) => {
  console.log("Current State:", state, "Action:", action); // Debug log

  switch (action.type) {
    case "ADD_TO_CART": {
      const { product } = action;

      if (
        !product ||
        !Number.isInteger(product.quantity) ||
        product.quantity <= 0
      ) {
        return state; // Invalid product, return the current state.
      }

      const existingProductIndex = (state.products || []).findIndex(
        (p) => p.id === product.id
      );

      if (existingProductIndex !== -1) {
        // Product already exists in the cart, so update its quantity.
        const updatedProducts = [...(state.products || [])];
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          quantity:
            updatedProducts[existingProductIndex].quantity + product.quantity,
        };

        return {
          ...state,
          products: updatedProducts,
          cartQuantity: state.cartQuantity + product.quantity,
        };
      } else {
        // Product is not in the cart, so add it with the input quantity.
        const newProduct = {
          ...product,
          quantity: typeof product.quantity === "number" ? product.quantity : 1,
        };

        return {
          ...state,
          products: [...(state.products || []), newProduct],
          cartQuantity: state.cartQuantity + newProduct.quantity,
        };
      }
    }

    case "UPDATE_CART_PRODUCT":
      const updatedProductsList = (state.products || []).map((product) =>
        product.id === Number(action.productId)
          ? { ...product, quantity: action.newQuantity }
          : product
      );
      console.log("Updated Products:", updatedProductsList);

      return {
        ...state,
        products: updatedProductsList,
        cartQuantity: computeCartQuantity(updatedProductsList),
      };

    case "REMOVE_FROM_CART":
      const remainingProducts = state.products.filter(
        (product) => product.id !== action.productId
      );
      return {
        ...state,
        products: remainingProducts,
        cartQuantity: computeCartQuantity(remainingProducts),
      };

    case "EMPTY_CART":
      return {
        ...state,
        products: [],
        cartQuantity: 0,
      };

    case "INITIALIZE_CART":
      console.log("Type of action.cart:", typeof action.cart); // Debug log to check the type of action.cart

      if (!state.initialized) {
        // If action.cart is an object, convert it to an array
        const initializedProducts = Array.isArray(action.cart)
          ? action.cart
          : Object.values(action.cart).map((item) => ({
              ...item,
              quantity:
                typeof item.quantity === "number" && item.quantity > 0
                  ? item.quantity
                  : 1,
            }));

        return {
          ...state,
          products: initializedProducts,
          cartQuantity: computeCartQuantity(initializedProducts),
          initialized: true,
        };
      }
      return state;

    default:
      return state; // Add a default case to return the current state for unknown actions.
  }
};
