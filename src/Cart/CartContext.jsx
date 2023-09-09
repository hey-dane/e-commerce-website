import React, { createContext, useContext, useReducer, useEffect } from "react";
import cartReducer from "./CartReducer";
import {
  addProductToCart,
  updateCartProduct,
  removeProductFromCart,
  checkoutCart,
} from "./CartActions";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch(addProductToCart(product));
  };

  const updateCartItem = (productId, newQuantity) => {
    dispatch(updateCartProduct(productId, newQuantity));
  };

  const removeFromCart = (productId) => {
    dispatch(removeProductFromCart(productId));
  };

  const checkout = () => {
    checkoutCart(cart)
      .then(() => {
        // Clear the cart or perform any other necessary actions
        dispatch({ type: "CLEAR_CART" });
      })
      .catch((error) => {
        console.error("Checkout error:", error);
      });
  };

  useEffect(() => {
    // You can load the initial cart data here if needed
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCartItem,
        removeFromCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
