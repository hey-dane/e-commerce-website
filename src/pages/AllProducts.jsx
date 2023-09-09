import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../Product/ProductContext";

export default function AllProducts() {
  const { products, dispatch, getAllProducts } = useProduct();

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
      <ul>
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <h2>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
              </h2>
              <img src={product.image} alt={product.title} />
            </li>
          ))}
      </ul>
    </div>
  );
}
