const API_BASE_URL = "https://fakestoreapi.com";

export const getAllUsers = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/users`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const getSingleUser = async (userId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${userId}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching a single user:", error);
    throw error;
  }
};

export const getLimitedUsers = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/users?limit=5`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching limited user view:", error);
    throw error;
  }
};

export const getSortedUsers = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/users?sort=desc`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching sorted users:", error);
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    console.log("User Data Sent:", userData); // Log the sent data
    const res = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify(userData),
    });
    const responseJson = await res.json();
    console.log("Registration Response:", responseJson); // Log the API response
    return responseJson;
  } catch (error) {
    console.error("Error adding new user:", error);
    throw error;
  }
};

/* export const updateUser = async (userId, updatedUserData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(updatedUserData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}; */

export const updateUserWithPatch = async (userId, updatedUserData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUserData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error updating user with PATCH:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
