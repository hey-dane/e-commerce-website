import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { getLocalStorageCart, setLocalStorageCart } from "./CartActions";
import cartReducer from "./cartReducer";

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [cartQuantity, setCartQuantity] = useState(0); // Add cartQuantity state

  useEffect(() => {
    // Load cart items from local storage
    const storedCart = getLocalStorageCart();
    if (storedCart && storedCart.length > 0) {
      dispatch({ type: "INITIALIZE_CART", cart: storedCart });
    }
  }, []);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", product });
    setLocalStorageCart([...cart, product]);
  };

  const updateCartProduct = (productId, newQuantity) => {
    dispatch({ type: "UPDATE_CART_PRODUCT", productId, newQuantity });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", productId });
  };

  const checkout = () => {
    dispatch({ type: "EMPTY_CART" });
    setLocalStorageCart([]); // Clears cart data from local storage
  };

  useEffect(() => {
    setLocalStorageCart(cart);
  }, [cart]);

  useEffect(() => {
    // Calculate the total cart quantity
    const totalQuantity = cart.reduce(
      (total, product) => total + product.quantity,
      0
    );
    setCartQuantity(totalQuantity);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartQuantity,
        dispatch,
        addToCart,
        updateCartProduct,
        removeFromCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
