const localStorageKey = "user";
const usersLocalStorageKey = "users";

const isPageReloaded = () =>
  !performance.navigation.type || performance.navigation.type === 1;

const clearUserDataFromLocalStorage = () =>
  localStorage.removeItem(localStorageKey);

export const registerUser = async (userData) => {
  console.log("registerUser Called", userData);

  const existingUsers =
    JSON.parse(localStorage.getItem(usersLocalStorageKey)) || [];

  if (existingUsers.some((user) => user.username === userData.username)) {
    throw new Error("Username already exists. Please try another.");
  }

  const newUser = {
    ...userData,
    id: Date.now(),
    name: { ...userData.name },
    address: { ...userData.address },
  };

  existingUsers.push(newUser);
  localStorage.setItem(usersLocalStorageKey, JSON.stringify(existingUsers));

  localStorage.setItem(localStorageKey, JSON.stringify(newUser));

  if (isPageReloaded()) {
    clearUserDataFromLocalStorage();
  }

  return newUser;
};

export const loginUser = async (username, password) => {
  const users = JSON.parse(localStorage.getItem(usersLocalStorageKey)) || [];

  const foundUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!foundUser) {
    throw new Error("Invalid username or password.");
  }

  foundUser.token = foundUser.token || `mock_token_for_${username}`;
  localStorage.setItem(localStorageKey, JSON.stringify(foundUser));

  if (isPageReloaded()) {
    clearUserDataFromLocalStorage();
  }

  return foundUser;
};

export const logoutUser = () => {
  clearUserDataFromLocalStorage();
};

export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem(localStorageKey)) || {};
};

export const updateUserDataAction = (userData) => {
  const existingUserData = getLoggedInUser();

  const updatedUserData = {
    ...existingUserData,
    ...userData,
  };

  localStorage.setItem(localStorageKey, JSON.stringify(updatedUserData));

  return updatedUserData;
};

export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_REGISTER = "AUTH_REGISTER";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
