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
  const [paymentStatus, setPaymentStatus] = useState(null); // New paymentStatus state

  useEffect(() => {
    if (paymentStatus === "success") {
      // Do something when payment is successful
      const storedCart = getLocalStorageCart();
      if (storedCart && storedCart.length > 0) {
        dispatch({ type: "INITIALIZE_CART", cart: storedCart });
      }

      // Reset paymentStatus to null after handling success
      setPaymentStatus(null);
    }
  }, [paymentStatus]);

  const addToCart = (product) => {
    const existingProduct = cart.find((p) => p.id === product.id);

    if (existingProduct) {
      // If the product is already in the cart, increment its quantity
      updateCartProduct(existingProduct.id, existingProduct.quantity + 1);
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      dispatch({ type: "ADD_TO_CART", product });
    }
  };

  const updateCartProduct = (productId, newQuantity) => {
    dispatch({ type: "UPDATE_CART_PRODUCT", productId, newQuantity });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", productId });
  };

  const checkout = () => {
    console.log("Before emptying the cart:", cart);
    dispatch({ type: "EMPTY_CART" });
    console.log("After emptying the cart:", cart);
    setLocalStorageCart([]); // Clears cart data from local storage
    setCartQuantity(0); // Reset cart quantity
    setPaymentStatus("success"); // Set payment status to "success"
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
        paymentStatus, // Include payment status in the context

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
