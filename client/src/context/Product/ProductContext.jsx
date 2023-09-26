import React, { createContext, useContext, useEffect, useReducer } from "react";
import { productsReducer } from "./ProductReducer";
import { getAllProducts } from "./ProductActions";

export const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, dispatch] = useReducer(productsReducer, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        dispatch({ type: "SET_PRODUCTS", products: fetchedProducts });
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const contextValue = {
    products,
    dispatch,
    getAllProducts,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
