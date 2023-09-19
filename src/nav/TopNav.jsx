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
import SearchResult from "../pages/SearchResults";

export default function TopNav({ onSearch }) {
  const { isAuthenticated, user, logout } = useAuth();
  const { searchQuery, setSearchQuery, queryResults, executeSearch } =
    useSearch();
  const [query, setQuery] = useState("");
  const { cartQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {}, [queryResults]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    executeSearch(query);

    navigate(`/search`);
  };

  return (
    <>
      {/* TopNav */}
      <div className="p-3 text-center bg-white border-bottom">
        <div id="nav-top">
          <div className="row">
            {/* Left elements */}
            <div className="col-md-4 col-12 d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
              <Link to="/" aria-label="Go to homepage">
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
                    style={{ color: "#9a626d" }}
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
                >
                  <span>
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      style={{ color: "#9a626d" }}
                      aria-hidden="true"
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
                      aria-label="User menu"
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        size="lg"
                        style={{ color: "#9a626d" }}
                        aria-hidden="true"
                      />
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          aria-label="View my profile"
                        >
                          My profile
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          aria-label="Other options"
                        >
                          Other
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={logout}
                          aria-label="Logout"
                        >
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
                      aria-label="User menu"
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        size="lg"
                        style={{ color: "#9a626d" }}
                        aria-hidden="true"
                      />
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li className="dropdown-item">
                        <Link to="/login" aria-label="Login">
                          Login
                        </Link>
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
      {/* TopNav */}
    </>
  );
}
