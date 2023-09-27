import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="text-center text-white"
      style={{
        backgroundColor: "var(--color-dark)",
        position: "fixed",
        bottom: "0",
        width: "100%",
        padding: "5px 0",
        zIndex: 2,
      }}
    >
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{
          fontSize: "0.7rem",
          gap: "10px",
        }}
      >
        <span style={{ color: "var(--color-light)" }}>Register for free</span>

        <Link
          to="/register"
          className="btn btn-outline-light btn-sm"
          style={{
            fontSize: "0.7rem",
            padding: "2px 10px",
          }}
        >
          Sign up!
        </Link>

        <span
          style={{
            padding: "2px 4px",
            borderRadius: "2px",
          }}
        >
          &copy; {new Date().getFullYear()} shop. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
