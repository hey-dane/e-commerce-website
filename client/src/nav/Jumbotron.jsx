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
    } else if (pathname === "/") {
      setCurrentCategory("Home");
    } else if (pathname === "/allproducts") {
      setCurrentCategory("All Products");
    } else {
      setCurrentCategory("");
    }
  }, [location]);

  // Define different JSX for the home page and other pages
  const isHomePage = location.pathname === "/";
  let jumbotronContent;

  if (isHomePage) {
    jumbotronContent = (
      <div className="p-2 text-center bg-light">
        <div className="header bg-light" id="jumbotron-container">
          <div className="animated-text slide-from-top" id="salestext">
            WOMENS SHIRTS
            <p>Starting at $7.95!</p>
          </div>
          <div className="animated-text ">
            <h5>ALL ACCESSORIES 50% OFF</h5>
          </div>
          <div className="animated-text slide-from-top" id="salestext">
            NEW SELECTION OF ELECTRONICS
            <p>TV, memory cards and more!</p>
          </div>
        </div>
      </div>
    );
  } else {
    jumbotronContent = (
      <div className="p-4 text-center bg-light">
        <div className="navbar-category mb-0 h3">{currentCategory}</div>
      </div>
    );
  }

  return jumbotronContent;
}
