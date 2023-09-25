export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

const authReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER_DATA:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN:
    case REGISTER:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      localStorage.removeItem("user");
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
