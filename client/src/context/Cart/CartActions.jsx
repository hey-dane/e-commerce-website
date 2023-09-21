const CART_STORAGE_KEY = "cart";

export const getLocalStorageCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

export const setLocalStorageCart = (cart) => {
  if (cart !== undefined) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }
};

export const getAllCarts = () => {
  return getLocalStorageCart();
};

export const getSingleCart = (cartId) => {
  const carts = getLocalStorageCart();
  return carts.find((cart) => cart.id === cartId) || null;
};

export const getLimitedCartView = () => {
  const carts = getLocalStorageCart();
  return carts.slice(0, 5);
};
