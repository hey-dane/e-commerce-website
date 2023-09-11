import React, { useEffect, useState } from "react";
import { useProduct } from "../Product/ProductContext";
import { useSearch } from "../components/SearchContext";
import IndexCard from "../components/IndexCard";

export default function AllProducts() {
  const { products, dispatch, getAllProducts } = useProduct();
  const { searchQuery } = useSearch();
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  useEffect(() => {
    if (searchQuery) {
      filterProducts(searchQuery);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const filterProducts = (query) => {
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <h1>All Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProducts &&
          filteredProducts.map((product) => (
            <IndexCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
