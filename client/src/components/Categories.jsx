import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IndexCard from "../components/IndexCard";

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
    <div
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text)",
        paddingBottom: "180px",
      }}
    >
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {products.map((product) => (
          <IndexCard
            key={product.id}
            product={product}
            style={{
              backgroundColor: "var(--color-background)",
              color: "var(--color-text)",
              borderColor: "var(--color-border)",
              fontFamily: "var(--font-poppins)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
