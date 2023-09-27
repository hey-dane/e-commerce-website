import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import { CartContext } from "../context/Cart/CartContext";
import { useSearch } from "../context/Search/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function TopNav() {
  const { isAuthenticated, user, logout } = useAuth();
  const { searchQuery, setSearchQuery, queryResults, executeSearch } =
    useSearch();
  const [query, setQuery] = useState("");
  const { cartQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      await executeSearch(query);
      navigate(`/search`);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const renderUserDropdown = () => {
    if (isAuthenticated) {
      return (
        <div className="dropdown">
          <a
            className="text-reset dropdown-toggle d-flex align-items-center hidden-arrow"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-label="User menu"
          >
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              style={{ color: "var(--link-color)" }}
              aria-hidden="true"
            />
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li>
              <Link
                to="/account"
                className="dropdown-item"
                aria-label="View my account"
                style={{ color: "var(--nav-color)" }}
              >
                My Account
              </Link>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={logout}
                aria-label="Logout"
                style={{ color: "var(--nav-color)" }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="dropdown">
          <a
            className="text-reset dropdown-toggle d-flex align-items-center hidden-arrow"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-label="User menu"
          >
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              style={{ color: "var(--active-color)" }}
              aria-hidden="true"
            />
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li className="dropdown-item">
              <Link
                to="/login"
                aria-label="Login"
                style={{ color: "var(--nav-color)" }}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      );
    }
  };

  return (
    <>
      {/* TopNav */}
      <div
        className="p-3 text-center"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "var(--color-border)",
          color: "var(--color-text)",
          fontFamily: "var(--font-primary)",
        }}
      >
        <div id="nav-top">
          <div className="row">
            {/* Left elements */}
            <div className="col-md-4 col-12 d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
              <Link to="/" aria-label="Go to homepage">
                <img
                  src="https://placehold.co/100x35/FFF/3c1642/?text=shop."
                  alt="Logo"
                />
              </Link>
            </div>
            {/* Left elements */}

            {/* Center elements */}
            <div className="col-md-4 col-12">
              <form
                onSubmit={handleSearchSubmit}
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
                  aria-label="Search products"
                />
                <button
                  type="submit"
                  className="btn btn-outline-secondary"
                  aria-label="Submit search"
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{ color: "var(--hover-color)" }}
                    aria-hidden="true"
                  />
                </button>
              </form>
            </div>
            {/* Center elements */}

            {/* Right elements */}
            <div className="col-md-4 col-12 d-flex justify-content-center justify-content-md-end align-items-center">
              <div className="d-flex">
                <Link
                  to="/cart"
                  className="text-reset me-3"
                  aria-label="Go to shopping cart"
                  style={{ color: "var(--link-color)" }}
                >
                  <span>
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      style={{ color: "var(--link-color)" }}
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="badge rounded-pill badge-notification"
                    style={{
                      backgroundColor: "var(--color-hover)",
                      color: "var(--navbar-color)",
                    }}
                  >
                    {isNaN(cartQuantity) ? 0 : cartQuantity}
                  </span>
                </Link>

                {renderUserDropdown()}
              </div>
            </div>
            {/* Right elements */}
          </div>
        </div>
      </div>
      {/* TopNav */}
    </>
  );
}
