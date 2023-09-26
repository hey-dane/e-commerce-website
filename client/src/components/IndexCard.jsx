import React from "react";
import { Link } from "react-router-dom";

export default function IndexCard({ product }) {
  const cardStyle = {
    padding: "15px",
    backgroundColor: "var(--color-background)",
    borderColor: "var(--color-border)",
  };

  return (
    <div className="col-md-3 col-sm-6 mb-4" style={cardStyle}>
      <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
        <div className="card h-100">
          <div className="d-flex justify-content-center p-3">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid rounded"
              style={{ maxWidth: "60%", height: "auto" }}
            />
          </div>
          <div className="card-body d-flex flex-column justify-content-end">
            <h3 className="card-title">{product.title}</h3>
            <h4 className="card-title" style={{ color: "var(--color-accent)" }}>
              ${product.price}
            </h4>
          </div>
        </div>
      </Link>
    </div>
  );
}
