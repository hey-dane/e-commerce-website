import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSingleProduct } from "../context/Product/ProductActions";

export default function Jumbotron() {
  const location = useLocation();
  const [currentCategory, setCurrentCategory] = useState("All Products");

  useEffect(() => {
    const pathname = location.pathname;
    const pathToCategory = (category) => setCurrentCategory(category);

    switch (pathname) {
      case "/":
        pathToCategory("Home");
        break;
      case "/cart":
        pathToCategory("Cart");
        break;
      case "/login":
        pathToCategory("Login");
        break;
      case "/search":
        pathToCategory("Search Results");
        break;
      case "/allproducts":
        pathToCategory("All Products");
        break;
      case "/register":
        pathToCategory("Account Registration");
        break;
      case "/account":
        pathToCategory("Account Details");
        break;
      default:
        if (pathname.startsWith("/category/")) {
          const category = pathname.replace("/category/", "").replace("-", " ");
          pathToCategory(category);
        } else if (pathname.startsWith("/products/")) {
          const productId = pathname.split("/")[2];
          getSingleProduct(productId)
            .then((productData) => pathToCategory(productData.category))
            .catch((error) => console.error("Error fetching product:", error));
        } else {
          setCurrentCategory("");
        }
    }
  }, [location]);

  const isHomePage = location.pathname === "/";
  let jumbotronContent;

  if (isHomePage) {
    jumbotronContent = (
      <div
        className="p-1 text-center"
        style={{
          backgroundColor: "var(--color-offset)",
          color: "var(--color-text)",
        }}
      >
        <div className="header" id="jumbotron-container">
          <div className="animated-text slide-from-top" id="salestext">
            WOMENS SHIRTS
            <p style={{ fontSize: "16px" }}>Starting at $7.95!</p>
          </div>
          <div className="animated-text">
            <h5>ALL ACCESSORIES 50% OFF</h5>
          </div>
          <div className="animated-text slide-from-top" id="salestext">
            NEW SELECTION OF ELECTRONICS
            <p style={{ fontSize: "16px" }}>TV, memory cards and more!</p>
          </div>
        </div>
      </div>
    );
  } else {
    jumbotronContent = (
      <div
        className="p-3 text-center"
        style={{
          backgroundColor: "var(--color-offset)",
          color: "var(--color-text)",
        }}
      >
        <div
          className="navbar-category mb-0 h3"
          aria-label={`Current Category: ${currentCategory}`}
        >
          {currentCategory}
        </div>
      </div>
    );
  }

  return jumbotronContent;
}
