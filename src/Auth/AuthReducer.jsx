import { LOGIN, LOGOUT, REGISTER } from "./AuthContext";

// AuthReducer.js
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
    case REGISTER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    // Define other action cases as needed
    default:
      return state;
  }
};

export default authReducer;
