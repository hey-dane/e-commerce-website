import React, { useContext } from "react";
import { CartContext } from "../context/Cart/CartContext";

function Completion() {
  const { cart } = useContext(CartContext);

  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-body">
          <h1
            className="card-title"
            style={{
              fontFamily: "var(--font-kanit)",
              color: "var(--color-accent)",
            }}
          >
            Thank You! 🎉
          </h1>
          <p
            className="card-text"
            style={{
              fontFamily: "var(--font-lato)",
              color: "var(--color-text)",
            }}
          >
            We appreciate your purchase. Your support means a lot to us!
          </p>
          <a
            href="/"
            className="btn"
            style={{
              backgroundColor: "var(--color-background)",
              borderColor: "var(--color-dark)",
              color: "var(--color-text)",
            }}
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Completion;
