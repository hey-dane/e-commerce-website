import React, { useEffect } from "react";
import { useProduct } from "../context/Product/ProductContext";
import { useSearch } from "../context/Search/SearchContext";
import IndexCard from "../components/IndexCard";

export default function AllProducts() {
  const { products, dispatch, getAllProducts } = useProduct();
  const { searchQuery, executeSearch, queryResults } = useSearch(); // Use executeSearch and queryResults from the context

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
  }, [dispatch]);

  return (
    <div>
      <h1>All Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <IndexCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
