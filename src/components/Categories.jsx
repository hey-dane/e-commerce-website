import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import IndexCard from "../components/IndexCard"; // Import the IndexCard component

export default function Categories() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let endpoint = "";

        switch (categoryName) {
          case "mens":
            endpoint = "men's clothing";
            break;
          case "womens":
            endpoint = "women's clothing";
            break;
          case "jewelery":
            endpoint = "jewelery";
            break;
          case "electronics":
            endpoint = "electronics";
            break;
          default:
            endpoint = "";
        }

        if (endpoint) {
          const response = await fetch(
            `https://fakestoreapi.com/products/category/${endpoint}`
          );
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <IndexCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
