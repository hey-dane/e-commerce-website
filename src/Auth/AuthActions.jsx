const API_BASE_URL = "https://fakestoreapi.com";

// Function to check if the page is being reloaded
const isPageReloaded = () => {
  return !performance.navigation.type || performance.navigation.type === 1;
};

// Function to clear user data from local storage
const clearUserDataFromLocalStorage = () => {
  localStorage.removeItem("user");
};

// Mock Registration
export const registerUser = async (userData) => {
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const userExists = existingUsers.some(
    (user) => user.username === userData.username
  );

  if (userExists) {
    throw new Error("Username already exists. Please try another.");
  }

  const newUser = {
    ...userData,
    id: Date.now(), // Giving a mock ID
  };

  existingUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(existingUsers));

  localStorage.setItem("user", JSON.stringify(newUser)); // Set this user as the currently logged in user

  // Clear user data from local storage if the page is reloaded
  if (isPageReloaded()) {
    clearUserDataFromLocalStorage();
  }

  return newUser;
};

// Mock Authentication
export const loginUser = async (username, password) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const foundUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!foundUser) {
    throw new Error("Invalid username or password.");
  }

  localStorage.setItem("user", JSON.stringify(foundUser)); // Set this user as the currently logged in user

  // Clear user data from local storage if the page is reloaded
  if (isPageReloaded()) {
    clearUserDataFromLocalStorage();
  }

  return foundUser.token || "mock_token_for_" + username; // Return a mock token or an actual one if you have it in user data
};

// Function to log the user out and clear data from local storage
export const logoutUser = () => {
  clearUserDataFromLocalStorage();
};

// Function to get the currently logged-in user from local storage
export const getLoggedInUser = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user;
};
