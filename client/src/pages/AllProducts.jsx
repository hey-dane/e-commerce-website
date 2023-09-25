import React, { useEffect } from "react";
import { useProduct } from "../context/Product/ProductContext";
import { useSearch } from "../context/Search/SearchContext";
import IndexCard from "../components/IndexCard";

export default function AllProducts() {
  const { products, dispatch, getAllProducts } = useProduct();
  const { executeSearch } = useSearch();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getAllProducts();
        dispatch({ type: "SET_PRODUCTS", products: fetchedProducts });
      } catch (error) {
        console.error("Error loading products.", error);
      }
    }
    fetchProducts();
  }, [dispatch, getAllProducts]);

  return (
    <div
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text)",
        display: "flex",
        flexWrap: "wrap",
      }}
      aria-label="All Products"
    >
      {products.map((product) => (
        <IndexCard
          key={product.id}
          product={product}
          aria-label={`Product: ${product.title}`}
        />
      ))}
    </div>
  );
}
