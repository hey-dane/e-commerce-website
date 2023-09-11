import React from "react";
import { Link } from "react-router-dom";

export default function IndexCard({ product }) {
  return (
    <div className="col-md-4 mb-4">
      <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
        <div className="card h-100" style={{ width: "400px" }}>
          <div className="d-flex flex-column justify-content-center align-items-center p-3 h-100">
            {/* Vertically center the image */}
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid rounded"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div className="card-body d-flex flex-column justify-content-end">
            <h5 className="card-title">{product.title}</h5>
            <h6 className="card-title" style={{ color: "#df9642" }}>
              ${product.price}
            </h6>
          </div>
        </div>
      </Link>
    </div>
  );
}
