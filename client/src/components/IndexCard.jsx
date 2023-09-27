import React from "react";
import { Link } from "react-router-dom";

export default function IndexCard({ product }) {
  const cardStyle = {
    padding: "15px",
    backgroundColor: "var(--color-background)",
    borderColor: "var(--color-border)",
    minHeight: "500px",
  };

  return (
    <div className="col-md-3 col-sm-6 mb-4" style={cardStyle}>
      <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
        <div className="card h-80" style={{ height: "100%" }}>
          <div
            className="d-flex justify-content-center align-items-center p-3"
            style={{ height: "100%" }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid rounded"
              style={{ maxWidth: "60%", maxHeight: "150px", height: "auto" }}
            />
          </div>
          <div className="card-body d-flex flex-column justify-content-end">
            <h2
              className="card-title"
              style={{ fontSize: "1.5rem", lineHeight: "1.2" }}
            >
              {product.title}
            </h2>
            <h4
              className="card-title"
              style={{ color: "var(--color-accent)", fontSize: "1rem" }}
            >
              ${product.price}
            </h4>
          </div>
        </div>
      </Link>
    </div>
  );
}
