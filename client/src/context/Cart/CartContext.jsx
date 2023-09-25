import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { getLocalStorageCart, setLocalStorageCart } from "./CartActions";
import { cartReducer } from "./cartReducer";

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const updateCartQuantity = (dispatch, cart) => {
  const totalQuantity = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  dispatch({ type: "UPDATE_CART_QUANTITY", cartQuantity: totalQuantity });
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    if (paymentStatus === "success") {
      const storedCart = getLocalStorageCart();
      if (storedCart && storedCart.length > 0) {
        dispatch({ type: "INITIALIZE_CART", cart: storedCart });
      }

      setPaymentStatus(null);
    }
  }, [paymentStatus]);

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find((p) => p.id === product.id);

    if (existingProduct) {
      updateCartProduct(
        existingProduct.id,
        existingProduct.quantity + quantity
      );
    } else {
      dispatch({ type: "ADD_TO_CART", product: { ...product, quantity } });
    }
  };

  const updateCartProduct = (productId, newQuantity) => {
    dispatch({ type: "UPDATE_CART_PRODUCT", productId, newQuantity });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", productId });
  };

  const checkout = () => {
    dispatch({ type: "EMPTY_CART" });
    setLocalStorageCart([]);
    setCartQuantity(0);
    setPaymentStatus("success");
  };

  useEffect(() => {
    setLocalStorageCart(cart);
  }, [cart]);

  useEffect(() => {
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
        paymentStatus,

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
