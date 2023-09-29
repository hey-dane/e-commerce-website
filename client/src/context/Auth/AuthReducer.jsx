import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  UPDATE_USER_DATA,
} from "./AuthContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
    case AUTH_REGISTER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
