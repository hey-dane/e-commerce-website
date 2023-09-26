import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  getLoggedInUser,
  updateUserDataAction,
} from "./AuthActions";
import authReducer, { LOGIN, LOGOUT, REGISTER } from "./AuthReducer";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = getLoggedInUser();

    if (loggedInUser && loggedInUser.username) {
      setUser(loggedInUser);
    } else {
      setUser(null);
    }
  }, []);

  const initial = {
    user,
    isAuthenticated: user !== null && Object.keys(user).length > 0,
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

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout: userLogout,
        register,
        updateUser,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
