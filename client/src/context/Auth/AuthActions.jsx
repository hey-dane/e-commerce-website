const API_BASE_URL = "https://fakestoreapi.com";

const isPageReloaded = () => {
  return !performance.navigation.type || performance.navigation.type === 1;
};

const clearUserDataFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const registerUser = async (userData) => {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  if (existingUsers.some((user) => user.username === userData.username)) {
    throw new Error("Username already exists. Please try another.");
  }

  const newUser = {
    ...userData,
    id: Date.now(), // Giving a mock ID
  };

  existingUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(existingUsers));

  "user", JSON.stringify(newUser);

  if (isPageReloaded()) {
    clearUserDataFromLocalStorage();
  }

  return newUser;
};

export const loginUser = async (username, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!foundUser) {
    throw new Error("Invalid username or password.");
  }

  localStorage.setItem("user", JSON.stringify(foundUser));

  if (isPageReloaded()) {
    clearUserDataFromLocalStorage();
  }

  return foundUser.token || `mock_token_for_${username}`;
};

export const logoutUser = () => {
  clearUserDataFromLocalStorage();
};

export const getLoggedInUser = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  return user;
};
