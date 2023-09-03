// product

const API_BASE_URL = "https://fakestoreapi.com";

export const getAllProducts = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/products`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const addNewProduct = async (productData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify(productData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error adding a new product:", error);
    throw error;
  }
};

export const getSingleProduct = async (productId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${productId}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching a single product:", error);
    throw error;
  }
};

export const getLimitedProductView = async (limit) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products?limit=${limit}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching limited product view:", error);
    throw error;
  }
};

export const getSortedProducts = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/products?sort=desc`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching sorted products:", error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/categories`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching all categories:", error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/category/${category}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

export const addToCart = async (productData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/cart`, {
      method: "POST",
      body: JSON.stringify(productData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const updateProduct = async (productId, updatedProductData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: "PUT",
      body: JSON.stringify(updatedProductData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const updateProductWithPatch = async (productId, updatedProductDate) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: "PATCH",
      body: JSON.stringify(updatedProductDate),
    });
    return await res.json();
  } catch (error) {
    console.error("Error updating product with PATCH:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
