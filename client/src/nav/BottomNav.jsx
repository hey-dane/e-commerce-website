import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Jumbotron from "./Jumbotron";

const BottomNav = () => {
  const location = useLocation();
  const [currentCategory, setCurrentCategory] = useState("All Products");

  // Drop Down Categories
  const bestsellersCategories = ["All Products"];
  const clothesCategories = ["MENS", "WOMENS"];
  const accessoriesCategories = ["JEWELERY"];
  const electronicsCategories = ["ELECTRONICS"];

  const allCategories = [
    ...bestsellersCategories,
    ...clothesCategories,
    ...accessoriesCategories,
    ...electronicsCategories,
  ];

  return (
    <>
      {/* BottomNav */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "var(--color-dark)" }}
      >
        <div className="container">
          {/* Mobile Navigation Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation menu"
            role="button"
          >
            <FontAwesomeIcon
              icon={faBars}
              style={{ color: "var(--color-light)" }}
            />
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {allCategories.map((category) => (
                <li key={category} className="nav-item">
                  <div className="dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id={`${category}Dropdown`}
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      aria-haspopup="true"
                      aria-label={`Open ${category} menu`}
                    >
                      {category}
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby={`${category}Dropdown`}
                      role="menu"
                      style={{
                        backgroundColor: "var(--color-background)",
                        color: "var(--color-dark)",
                      }}
                    >
                      {category === "All Products" ? (
                        <li role="presentation">
                          <Link
                            to={`/allproducts`}
                            className="dropdown-item"
                            role="menuitem"
                            aria-label={`View all ${category}`}
                          >
                            {category}
                          </Link>
                        </li>
                      ) : (
                        <li role="presentation">
                          <Link
                            to={`/category/${category
                              .toLowerCase()
                              .replace(" ", "-")}`}
                            className="dropdown-item"
                            role="menuitem"
                            aria-label={`View ${category} category`}
                          >
                            {category}
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Navigation Links */}
        </div>
        {/* Container wrapper */}
      </nav>
      {/* BottomNav */}
      <Jumbotron />
    </>
  );
};

export default BottomNav;
