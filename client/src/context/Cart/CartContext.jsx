import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { getLocalStorageCart, setLocalStorageCart } from "./CartActions";
import { cartReducer, cartStart as initialCart } from "./cartReducer";

export const CartContext = createContext({
  cart: { products: [], cartQuantity: 0 },
  dispatch: () => {},
});

export const computeCartQuantity = (products) => {
  return products.reduce((total, product) => total + product.quantity, 0);
};

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const storedCart = getLocalStorageCart() || { products: [], cartQuantity: 0 };
  const [cart, dispatch] = useReducer(cartReducer, storedCart);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const emptyCart = () => {
    dispatch({ type: "EMPTY_CART" });

    setLocalStorageCart([]);

    setCartQuantity(0);
  };

  useEffect(() => {
    if (paymentStatus === "success") {
      const storedCart = getLocalStorageCart();
      if (storedCart && storedCart.products && storedCart.products.length > 0) {
        dispatch({ type: "INITIALIZE_CART", cart: storedCart });
      }
      setPaymentStatus(null);
    }
  }, [paymentStatus]);

  const addToCart = (product, quantity = 1) => {
    const validQuantity = Number(quantity) || 1;
    const existingProduct = (cart.products || []).find(
      (p) => p.id === product.id
    );

    if (existingProduct) {
      updateCartProduct(
        existingProduct.id,
        existingProduct.quantity + validQuantity
      );
    } else {
      dispatch({
        type: "ADD_TO_CART",
        product: { ...product, quantity: validQuantity },
      });
    }

    setLocalStorageCart(cart);
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
    try {
      setLocalStorageCart(cart);
    } catch (error) {
      console.error("Failed to access local storage", error);
    }
  }, [cart]);

  useEffect(() => {
    const totalQuantity = (cart.products || []).reduce(
      (total, product) => total + product.quantity,
      0
    );
    setCartQuantity(totalQuantity);
  }, [cart.products]);

  useEffect(() => {
    const storedCart = getLocalStorageCart();
    if (storedCart && storedCart.products && storedCart.products.length > 0) {
      dispatch({ type: "INITIALIZE_CART", cart: storedCart });
    }
  }, []);

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
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
