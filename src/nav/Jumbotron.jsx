import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSingleProduct } from "../context/Product/ProductActions";

export default function Jumbotron() {
  const location = useLocation();
  const [currentCategory, setCurrentCategory] = useState("All Products");

  // Determine the current category based on the route
  useEffect(() => {
    const pathname = location.pathname;

    if (pathname.startsWith("/category/")) {
      const category = pathname.replace("/category/", "").replace("-", " ");
      setCurrentCategory(category);
    } else if (pathname.startsWith("/products/")) {
      const productId = pathname.split("/")[2];
      getSingleProduct(productId)
        .then((productData) => setCurrentCategory(productData.category))
        .catch((error) => console.error("Error fetching product:", error));
    } else if (pathname === "/cart") {
      setCurrentCategory("Cart");
    } else if (pathname === "/login") {
      setCurrentCategory("Login");
    } else if (pathname === "/search") {
      setCurrentCategory("Search Results");
    } else {
      setCurrentCategory("");
    }
  }, [location]);

  return (
    <div className="p-5 text-center bg-light">
      <div className="navbar-category mb-0 h3">{currentCategory}</div>
    </div>
  );
}
