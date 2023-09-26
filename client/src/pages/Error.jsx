import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text)",
        textAlign: "center",
        padding: "20px",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-poppins)",
          fontSize: "36px",
        }}
      >
        Oops! Something went wrong.
      </h1>
      <p
        style={{
          fontFamily: "var(--font-lato)",
          fontSize: "18px",
        }}
      >
        We couldn't find the page you're looking for.
      </p>
      <Link
        to="/"
        style={{
          fontFamily: "var(--font-kanit)",
          fontSize: "24px",
          color: "var(--color-accent)",
          textDecoration: "none",
          marginTop: "20px",
          display: "block",
        }}
      >
        Go back to the home page
      </Link>
    </div>
  );
};

export default Error;
