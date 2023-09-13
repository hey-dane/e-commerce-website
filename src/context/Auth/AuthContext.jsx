import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import authReducer from "./AuthReducer";
import {
  loginUser,
  registerUser,
  logoutUser,
  getLoggedInUser,
} from "./AuthActions";
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

  const [user, setUser] = useState(getLoggedInUser());

  useEffect(() => {
    // Load cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setUser({
      ...user,
      cartItems: storedCartItems,
    });
  }, []);

  const initial = {
    user,
    isAuthenticated: Object.keys(user).length > 0,
  };

  const [state, dispatch] = useReducer(authReducer, initial);

  const login = async (username, password) => {
    try {
      const user = await loginUser(username, password);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      dispatch({ type: LOGIN, payload: user });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const userLogout = () => {
    logoutUser();
    setUser({});
    dispatch({ type: LOGOUT });
    navigate("/login");
  };

  const register = async (userData) => {
    try {
      const user = await registerUser(userData);
      localStorage.setItem("user", JSON.stringify(user));
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
        logout: userLogout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
