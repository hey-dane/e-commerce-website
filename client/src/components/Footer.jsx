import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="text-center text-white"
      style={{
        backgroundColor: "var(--color-dark)",
        marginTop: "20px",
      }}
    >
      <div className="container py-2">
        <section className="mb-2">
          <p className="d-flex justify-content-center align-items-center">
            <span className="me-3" style={{ color: "var(--color-light)" }}>
              Register for free
            </span>
            <Link to="/register" className="btn btn-outline-light rounded">
              Sign up!
            </Link>
          </p>
        </section>
      </div>

      <div
        className="text-center p-2"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; {new Date().getFullYear()} shop. E-Commerce Store. All rights
        reserved.
      </div>
    </footer>
  );
}
