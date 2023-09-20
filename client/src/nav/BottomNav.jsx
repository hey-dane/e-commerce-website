import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getSingleProduct } from "../context/Product/ProductActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Jumbotron from "./Jumbotron";

export default function BottomNav() {
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
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
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
            <FontAwesomeIcon icon={faBars} />
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <div className="dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="bestsellersDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    Bestsellers
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="bestsellersDropdown"
                    role="menu"
                  >
                    {bestsellersCategories.map((category, index) => (
                      <li key={index} role="presentation">
                        <Link
                          to={`/allproducts`}
                          className="dropdown-item"
                          role="menuitem"
                          aria-label={`View all ${category}`}
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <div className="dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="clothesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    Clothes
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="clothesDropdown"
                    role="menu"
                  >
                    {clothesCategories.map((category) => (
                      <li key={category} role="presentation">
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
                    ))}
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  {/* Dropdown for Accessories */}
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="accessoriesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    Accessories
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="accessoriesDropdown"
                    role="menu"
                  >
                    {accessoriesCategories.map((category, index) => (
                      <li key={index} role="presentation">
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
                    ))}
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  {/* Dropdown for Electronics */}
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="electronicsDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    Electronics
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="electronicsDropdown"
                    role="menu"
                  >
                    {electronicsCategories.map((category, index) => (
                      <li key={index} role="presentation">
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
                    ))}
                  </ul>
                </div>
              </li>
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
}
