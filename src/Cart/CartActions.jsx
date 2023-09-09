const LOCAL_STORAGE_KEY = "carts";

const getLocalStorageData = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const setLocalStorageData = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

// cart.js
export const getAllCarts = () => {
  return getLocalStorageData();
};

export const getSingleCart = (cartId) => {
  const carts = getLocalStorageData();
  return carts.find((cart) => cart.id === cartId) || null;
};

export const getLimitedCartView = () => {
  const carts = getLocalStorageData();
  return carts.slice(0, 5);
};

export const getSortedCart = () => {
  const carts = getLocalStorageData();
  return carts.sort((a, b) => b.date - a.date); // Assuming date is in a sortable format
};

export const getUserCarts = (userId) => {
  const carts = getLocalStorageData();
  return carts.filter((cart) => cart.userId === userId);
};

export const addProductToCart = (userId, productId, createdDate) => {
  const carts = getLocalStorageData();
  const newCart = {
    id: new Date().getTime().toString(),
    userId,
    date: createdDate,
    products: [
      { productId: productId, quantity: 1 },
      { productId: productId, quantity: 5 },
    ],
  };

  carts.push(newCart);
  setLocalStorageData(carts);
  return newCart;
};

export const updateCartProduct = (
  userId,
  productId,
  createdDate,
  updatedProductDate
) => {
  const carts = getLocalStorageData();
  const cartIndex = carts.findIndex((cart) => cart.id === productId);

  if (cartIndex !== -1) {
    carts[cartIndex].products = carts[cartIndex].products.map((product) =>
      product.productId === productId
        ? { ...product, date: updatedProductDate }
        : product
    );
    setLocalStorageData(carts);
    return carts[cartIndex];
  } else {
    throw new Error("Cart not found");
  }
};

export const updateCartProductWithPatch = (
  userId,
  productId,
  createdDate,
  updatedProductData
) => {
  const carts = getLocalStorageData();
  const cartIndex = carts.findIndex((cart) => cart.id === productId);

  if (cartIndex !== -1) {
    carts[cartIndex].products = carts[cartIndex].products.map((product) =>
      product.productId === productId
        ? { ...product, ...updatedProductData }
        : product
    );
    setLocalStorageData(carts);
    return carts[cartIndex];
  } else {
    throw new Error("Cart not found");
  }
};

export const deleteCart = (cartId) => {
  const carts = getLocalStorageData();
  const updatedCarts = carts.filter((cart) => cart.id !== cartId);
  setLocalStorageData(updatedCarts);
  return { success: true };
};

export const getCartsInDateRange = (startDate, endDate) => {
  const carts = getLocalStorageData();
  return carts.filter((cart) => cart.date >= startDate && cart.date <= endDate);
};
