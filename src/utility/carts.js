// cart

const API_BASE_URL = "https://fakestoreapi.com";

export const getAllCarts = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/carts`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching all carts:", error);
    throw error;
  }
};

export const getSingleCart = async (cartId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/carts/${cartId}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching a single cart:", error);
    throw error;
  }
};

export const getLimitedCartView = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/carts?limit=5`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching limited cart view:", error);
    throw error;
  }
};

export const getSortedCart = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/carts?sort=desc`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching sorted products:", error);
    throw error;
  }
};

export const getUserCarts = async (userId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/carts/${userId}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching user's carts:", error);
    throw error;
  }
};

export const addProductToCart = async (userId, productId, createdDate) => {
  try {
    const res = await fetch(`${API_BASE_URL}/carts`, {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        date: createdDate,
        products: [
          { productId: productId, quantity: 1 },
          { productId: productId, quantity: 5 },
        ],
      }),
    });
    return await res.json();
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const updateCartProduct = async (
  userId,
  productId,
  createdDate,
  updatedProductDate
) => {
  try {
    const res = await fetch(`${API_BASE_URL}/carts/${productId}`, {
      method: "PUT",
      body: JSON.stringify({
        userId: userId,
        date: createdDate,
        products: [{ productId: updatedProductDate, quantity: 3 }],
      }),
    });
    return await res.json();
  } catch (error) {
    console.error("Error updating cart product:", error);
    throw error;
  }
};

export const updateCartProductWithPatch = async (
  userId,
  productId,
  createdDate,
  updatedProductData
) => {
  try {
    const res = await fetch(`${API_BASE_URL}/carts/${productId}`, {
      method: "PATCH",
      body: JSON.stringify({
        userId: userId,
        date: createdDate,
        products: [{ productId: updatedProductData, quantity: 3 }],
      }),
    });
    return await res.json();
  } catch (error) {
    console.error("Error updating cart product with PATCH:", error);
    throw error;
  }
};

export const deleteCart = async (cartId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/carts/${cartId}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (error) {
    console.error("Error deleting cart:", error);
    throw error;
  }
};

export const getCartsInDateRange = async () => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/carts?startdate=2023-09-01&enddate=2024-12-31'`
    );
    return await res.json();
  } catch (error) {
    console.error("Error fetching carts within date range:", error);
    throw error;
  }
};
