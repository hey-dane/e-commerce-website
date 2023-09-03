import { Link } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  // REPLACE
  const bestsellersCategories = ["Category 1", "Category 2", "Category 3"];
  const clothesCategories = ["Category A", "Category B", "Category C"];
  const accessoriesCategories = ["Category X", "Category Y", "Category Z"];
  const electronicsCategories = ["Category I", "Category II", "Category III"];

  return (
    <>
      <header>
        <div className="p-3 text-center bg-white border-bottom">
          <div id="nav-top">
            <div className="row">
              {/* Left elements */}
              <div className="col-md-4 col-12 d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
                <a href="#!" className="ms-md-2">
                  <img
                    src="https://placehold.co/100x35/FFF/00a0d9/?text=store."
                    alt="Logo"
                  />
                </a>
              </div>
              {/* Left elements */}

              {/* Center elements */}
              <div className="col-md-4 col-12">
                <form className="d-flex input-group w-auto my-auto mb-3 mb-md-0">
                  <input
                    autoComplete="off"
                    type="search"
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
                  <div className="dropdown">
                    <a
                      className="text-reset dropdown-toggle d-flex align-items-center hidden-arrow"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                        className="rounded-circle"
                        height="22"
                        alt="User Avatar"
                        loading="lazy"
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
                          Settings
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
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
                          <a className="dropdown-item" href="#">
                            {category}
                          </a>
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
                      {clothesCategories.map((category, index) => (
                        <li key={index}>
                          <a className="dropdown-item" href="#">
                            {category}
                          </a>
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
                          <a className="dropdown-item" href="#">
                            {category}
                          </a>
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
                          <a className="dropdown-item" href="#">
                            {category}
                          </a>
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
