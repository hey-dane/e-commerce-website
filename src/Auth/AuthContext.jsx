import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import authReducer from "./AuthReducer";
import { loginUser, registerUser, updateUser, deleteUser } from "./AuthActions";
import { useNavigate } from "react-router-dom";

export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [checkoutStatus, setCheckoutStatus] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const updateCartItem = (productId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  // Function to complete the checkout process
  const checkout = () => {
    // Perform any necessary actions (e.g., make a purchase)
    // Then reset the cart and set checkout status to true
    setCart([]);
    setCheckoutStatus(true);
  };

  useEffect(() => {
    let userJSON = sessionStorage.getItem("user");

    if (!userJSON || userJSON === "undefined") {
      userJSON = JSON.stringify({}); // Initialize with an empty object
      sessionStorage.setItem("user", userJSON); // Store it as 'user'
    }

    try {
      const parsedUser = JSON.parse(userJSON);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user JSON:", error);
      setUser({});
    }
  }, []);

  const initial = {
    user,
    isAuthenticated: Object.keys(user).length > 0,
  };

  const [state, dispatch] = useReducer(authReducer, initial);

  const login = async (username, password) => {
    try {
      const user = await loginUser(username, password);
      sessionStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      dispatch({ type: LOGIN, payload: user });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser({});
    dispatch({ type: LOGOUT });
    navigate("/login"); // Add this line to redirect to the login page
  };

  const register = async (userData) => {
    try {
      const user = await registerUser(userData); // Pass userData to registerUser
      sessionStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      dispatch({ type: REGISTER, payload: user });
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        cart,
        addToCart,
        updateCartItem,
        removeFromCart,
        checkout,
        checkoutStatus, // Make sure to include checkoutStatus in the value
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
