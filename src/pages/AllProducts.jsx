import React, { useState, useEffect } from "react";
import { getAllProducts } from "../utility/products/";
import { useNavigate } from "react-router-dom";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  /* const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate(); */

  useEffect(() => {
    async function loadAllProducts() {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading products.", error);
      }
    }
    loadAllProducts();
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <img src={product.image} alt={product.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}
