const API_BASE_URL = "https://fakestoreapi.com";

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();

    if (result.error) {
      return { error: result.error.message };
    }

    if (result.token) {
      sessionStorage.setItem("user", result.token);
      return result.token;
    }
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return { error: errorMessage };
  }
};

export const logoutUser = async () => {
  try {
    await sessionStorage.removeItem("user");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const updateUser = async (userId, updatedUserData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    });
    const result = await response.json();

    if (result.error) {
      return { error: result.error.message };
    }

    // If the update was successful, you can return the updated user data
    // or a success message, depending on your application's needs
    return result; // You can customize this based on your requirements
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
    });
    const result = await response.json();

    if (result.error) {
      return { error: result.error.message };
    }

    // If the deletion was successful, you can return a success message
    // or any relevant data, depending on your application's needs
    return result; // You can customize this based on your requirements
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
