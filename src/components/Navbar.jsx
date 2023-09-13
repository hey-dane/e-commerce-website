import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { CartContext } from "../context/Cart/CartContext";
import { useSearch } from "../Search/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSearch,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getSingleProduct } from "../context/Product/ProductActions";

export default function Navbar({ onSearch }) {
  const { isAuthenticated, user, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();
  const [query, setQuery] = useState("");
  const location = useLocation();
  const [currentCategory, setCurrentCategory] = useState("All Products");
  const { cartQuantity } = useContext(CartContext);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(query);
  };

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

  // Determine the current category based on the route
  useEffect(() => {
    const pathname = location.pathname;

    if (pathname.startsWith("/category/")) {
      // Extract the category from the URL pathname for category views
      const category = pathname.replace("/category/", "").replace("-", " ");
      setCurrentCategory(category);
    } else if (pathname.startsWith("/products/")) {
      // For single product view, the category should be fetched from the API response
      // Call your modified getSingleProduct function here to fetch the category
      // Update setCurrentCategory with the category fetched from the API response
      const productId = pathname.split("/")[2];
      getSingleProduct(productId)
        .then((productData) => setCurrentCategory(productData.category))
        .catch((error) => console.error("Error fetching product:", error));
    } else if (pathname === "/cart") {
      // Handle the cart route specifically
      setCurrentCategory("Cart");
    } else {
      setCurrentCategory("All Products");
    }
  }, [location]);
  return (
    <>
      <header>
        {/* Jumbotron 1 */}
        <div className="p-3 text-center bg-white border-bottom">
          <div id="nav-top">
            <div className="row">
              {/* Left elements */}
              <div className="col-md-4 col-12 d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
                <Link to="/">
                  <img
                    src="https://placehold.co/100x35/FFF/9A616D/?text=shop."
                    alt="Logo"
                  />
                </Link>
              </div>
              {/* Left elements */}

              {/* Center elements */}
              <div className="col-md-4 col-12">
                <form
                  onSubmit={handleSearchSubmit} // Use onSubmit to handle form submission
                  className="d-flex input-group w-auto my-auto mb-3 mb-md-0"
                >
                  <input
                    autoComplete="off"
                    type="search"
                    id="search"
                    className="form-control rounded"
                    placeholder="Search"
                    value={query}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="btn btn-outline-secondary">
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ color: "#9a626d" }}
                    />
                  </button>
                </form>
              </div>
              {/* Center elements */}

              {/* Right elements */}
              <div className="col-md-4 col-12 d-flex justify-content-center justify-content-md-end align-items-center">
                <div className="d-flex">
                  <Link to="/cart" className="text-reset me-3">
                    <span>
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        style={{ color: "#9a626d" }}
                      />
                    </span>
                    <span className="badge rounded-pill badge-notification bg-danger">
                      {cartQuantity}
                    </span>
                  </Link>

                  {/* User */}
                  {isAuthenticated && (
                    <div className="dropdown">
                      <a
                        className="text-reset dropdown-toggle d-flex align-items-center hidden-arrow"
                        href="#"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          size="lg"
                          style={{ color: "#9a626d" }}
                        />
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            My profile
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Other
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" onClick={logout}>
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                  {!isAuthenticated && (
                    <div className="dropdown">
                      <a
                        className="text-reset dropdown-toggle d-flex align-items-center hidden-arrow"
                        href="#"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          size="lg"
                          style={{ color: "#9a626d" }}
                        />
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <li className="dropdown-item">
                          <Link to="/login">Login</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* Right elements */}
            </div>
          </div>
        </div>
        {/* Jumbotron 1*/}

        {/* Navbar1  */}
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
              aria-label="Toggle navigation"
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
                    >
                      Bestsellers
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="bestsellersDropdown"
                    >
                      {bestsellersCategories.map((category, index) => (
                        <li key={index}>
                          <Link to={`/allproducts`} className="dropdown-item">
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
                    >
                      Clothes
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="clothesDropdown"
                    >
                      {clothesCategories.map((category) => (
                        <li key={category}>
                          <Link
                            to={`/category/${category
                              .toLowerCase()
                              .replace(" ", "-")}`}
                            className="dropdown-item"
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
                    >
                      Accessories
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="accessoriesDropdown"
                    >
                      {accessoriesCategories.map((category, index) => (
                        <li key={index}>
                          <Link
                            to={`/category/${category
                              .toLowerCase()
                              .replace(" ", "-")}`}
                            className="dropdown-item"
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
                    >
                      Electronics
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="electronicsDropdown"
                    >
                      {electronicsCategories.map((category, index) => (
                        <li key={index}>
                          <Link
                            to={`/category/${category
                              .toLowerCase()
                              .replace(" ", "-")}`}
                            className="dropdown-item"
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
        {/* Navbar1 */}
        {/* Jumbotron */}
        <div className="p-5 text-center bg-light">
          <div className="navbar-category mb-0 h3">{currentCategory}</div>
        </div>
        {/* Jumbotron */}
      </header>
    </>
  );
}
