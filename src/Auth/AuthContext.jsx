import React, { createContext, useContext, useReducer, useEffect } from "react";
import { loginUser } from "./AuthActions";
// Define action types
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const user = sessionStorage.getItem("user");

  // Set initial state, parsing user data if it exists
  const initialState = {
    user: user ? JSON.parse(user) : null,
    isAuthenticated: false, // Assuming you want to track authentication state
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check if the user is already authenticated (e.g., using a token stored in localStorage)
    const isAuthenticated = () => {
      // Implement your own logic here to check authentication status
      return sessionStorage.getItem("authToken") !== null;
    };

    if (isAuthenticated()) {
      // If the user is authenticated, set the user data in the context
      const userData = {}; // Replace with your user data retrieval logic
      dispatch({ type: LOGIN, payload: userData });
    }
  }, []);

  const login = async (username, password) => {
    try {
      // Call your loginUser function from API with the provided username and password
      const user = await loginUser({ username, password });
      dispatch({ type: LOGIN, payload: user });
      // .setItem("authToken", user.token); // Store the token in localStorage
      sessionStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      // Handle login errors
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    // Clear the user data and token from the context and localStorage
    dispatch({ type: LOGOUT });
    // localStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
  };

  const registerUser = async (userData) => {
    try {
      // Call your registerUser function from API with the provided user data
      const user = await loginUser(userData); // Use a different name here
      dispatch({ type: LOGIN, payload: user });
      // localStorage.setItem("authToken", user.token); // Store the token in localStorage
    } catch (error) {
      // Handle registration errors
      console.error("Registration error:", error);
      throw error;
    }
  };

  const updateUser = async (userId, updatedUserData) => {
    try {
      // Call your updateUser function from API with the provided data
      const updatedUser = await updateUser(userId, updatedUserData);
      dispatch({ type: SOME_ACTION, payload: updatedUser });
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const updateUserWithPatch = async (userId, updatedUserData) => {
    try {
      // Call your updateUserWithPatch function from API with the provided data
      const updatedUser = await updateUserWithPatch(userId, updatedUserData);
      dispatch({ type: SOME_ACTION, payload: updatedUser });
      return updatedUser;
    } catch (error) {
      console.error("Error updating user with PATCH:", error);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      // Call your deleteUser function from API with the provided user ID
      await deleteUser(userId);
      dispatch({ type: SOME_ACTION });
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
