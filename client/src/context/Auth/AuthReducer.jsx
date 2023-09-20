import { LOGIN, LOGOUT, REGISTER } from "./AuthContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        user: null,
        isAuthenticated: false,
      };
    case REGISTER:
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default authReducer;
