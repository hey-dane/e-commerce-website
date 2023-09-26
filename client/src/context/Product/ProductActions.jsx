const API_BASE_URL = "https://fakestoreapi.com";

const fetchData = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, options);
    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(
        `Failed to fetch data. Status: ${res.status}. Message: ${errorMessage}`
      );
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

export const getAllProducts = async () => fetchData("/products");

export const getSingleProduct = async (id) => fetchData(`/products/${id}`);

export const getLimitedProductView = async (limit) =>
  fetchData(`/products?limit=${limit}`);

export const getSortedProducts = async () => fetchData("/products?sort=desc");

export const getAllCategories = async () => fetchData("/products/categories");

export const getProductsByCategory = async (category) =>
  fetchData(`/products/category/${category}`);

export const addToCart = async (productData) => {
  const options = {
    method: "POST",
    body: JSON.stringify(productData),
  };
  return fetchData("/cart", options);
};

export const updateProduct = async (Id, updatedProductData) => {
  const options = {
    method: "PUT",
    body: JSON.stringify(updatedProductData),
  };
  return fetchData(`/products/${Id}`, options);
};

export const deleteProduct = async (Id) => {
  const options = {
    method: "DELETE",
  };
  return fetchData(`/products/${Id}`, options);
};
