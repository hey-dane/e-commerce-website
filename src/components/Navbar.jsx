import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../Auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSearch,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  // DUMMY DATA REPLACE
  const bestsellersCategories = ["All Products"];
  const clothesCategories = ["MENS", "WOMENS"];
  const accessoriesCategories = ["JEWELERY"];
  const electronicsCategories = ["VIEW ALL"];

  return (
    <>
      <header>
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
                <form className="d-flex input-group w-auto my-auto mb-3 mb-md-0">
                  <input
                    autoComplete="off"
                    type="search"
                    id="search"
                    className="form-control rounded"
                    placeholder="Search"
                  />
                  <span className="input-group-text border-0 d-none d-lg-flex">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                </form>
              </div>
              {/* Center elements */}

              {/* Right elements */}
              <div className="col-md-4 col-12 d-flex justify-content-center justify-content-md-end align-items-center">
                <div className="d-flex">
                  {/* Cart */}
                  <a className="text-reset me-3" href="#">
                    <span>
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </span>
                    <span className="badge rounded-pill badge-notification bg-danger">
                      1
                    </span>
                  </a>

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
        {/* Jumbotron */}

        {/* Navbar */}
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
                    {/* Dropdown for Clothes */}
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
                      <li>
                        <Link to={`/mens`} className="dropdown-item">
                          Mens
                        </Link>
                      </li>
                      <li>
                        <Link to={`/womens`} className="dropdown-item">
                          Womens
                        </Link>
                      </li>
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
                          <Link to={`/jewelery`} className="dropdown-item">
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
                          <Link to={`/electronics`} className="dropdown-item">
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
        {/* Navbar */}
      </header>
    </>
  );
}