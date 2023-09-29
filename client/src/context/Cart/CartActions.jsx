export const CART_STORAGE_KEY = "cart";

export const getLocalStorageCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
  } catch (error) {
    console.error("Failed to access local storage", error);
    return [];
  }
};
export const setLocalStorageCart = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to set item in local storage", error);
  }
};

export const getAllCarts = getLocalStorageCart;

export const getSingleCart = (cartId) => {
  return getLocalStorageCart().find((cart) => cart.id === cartId) || null;
};

export const getLimitedCartView = () => {
  return getLocalStorageCart().slice(0, 5);
};
