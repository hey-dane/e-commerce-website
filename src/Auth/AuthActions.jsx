const API_BASE_URL = "https://fakestoreapi.com";

const handleResponse = async (response) => {
  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred.");
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const result = await handleResponse(response);
    sessionStorage.setItem("user", JSON.stringify(result));
    return result.token;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
export const registerUser = async (userData) => {
  try {
    console.log("Request Data:", JSON.stringify(userData)); // Log the request data
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      // Handle error cases here (e.g., non-2xx status codes)
      throw new Error(`Registration failed with status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Registration Response:", result); // Log the response data

    if (result && result.id) {
      // Registration was successful
      sessionStorage.setItem("user", JSON.stringify(result));
      return result; // Return the result for further use if needed
    } else {
      // Handle registration error here
      throw new Error("Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during registration:", error.message);
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

    return await handleResponse(response);
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

    const result = await handleResponse(response);
    return { message: "User deleted successfully", result };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const logoutUser = () => {
  sessionStorage.removeItem("user");
};
