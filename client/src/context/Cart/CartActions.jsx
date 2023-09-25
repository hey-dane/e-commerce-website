const CART_STORAGE_KEY = "cart";

export const getLocalStorageCart = () => {
  return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
};

export const setLocalStorageCart = (cart) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart || []));
};

export const getAllCarts = getLocalStorageCart;

export const getSingleCart = (cartId) => {
  return getLocalStorageCart().find((cart) => cart.id === cartId) || null;
};

export const getLimitedCartView = () => {
  return getLocalStorageCart().slice(0, 5);
};
