import React, { useState, useEffect } from "react";
import { getSingleProduct } from "../context/Product/ProductActions";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faInfoCircle,
  faStar,
  faMinus,
  faPlus,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function SingleProductView() {
  const { id } = useParams();
  const { addToCart, dispatch } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [currentCategory, setCurrentCategory] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productData = await getSingleProduct(id);
        setProduct(productData);
        setCurrentCategory(productData.category);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    console.log("Product:", product);
    console.log("Quantity:", quantity);

    dispatch({
      type: "ADD_TO_CART",
      product: { ...product, quantity },
    });
    navigate("/cart");
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center align-items-center h-90">
        <div className="col-md-10 col-lg-8">
          <div className="card m-1">
            <div
              className="card-body p-4 p-lg-5 text-var(--color-text)"
              aria-label="Product Details"
            >
              <div className="row">
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="img-fluid rounded"
                    style={{ maxWidth: "100%", marginBottom: "20px" }}
                  />
                </div>
                <div className="col-md-6">
                  <h1
                    className="mb-3"
                    style={{ fontSize: "1.5rem", color: "var(--color-text)" }}
                  >
                    {product.title}
                  </h1>
                  <p
                    className="mb-2"
                    style={{
                      fontSize: "14px",
                      fontFamily: "Lato, sans-serif",
                      color: "var(--color-text)",
                    }}
                  >
                    <FontAwesomeIcon icon={faTag} className="me-2" /> Price: ${" "}
                    {product.price}
                  </p>
                  <p
                    className="mb-3"
                    style={{
                      fontSize: "16px",
                      fontFamily: "Lato, sans-serif",
                      color: "var(--color-text)",
                    }}
                    aria-label={`Product Description: ${product.description}`}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="me-2" />{" "}
                    Description: {product.description}
                  </p>

                  {product.rating && (
                    <div className="mb-3">
                      <p style={{ color: "var(--color-text)" }}>
                        Rating: {product.rating.rate.toFixed(1)} stars
                      </p>
                      <div>
                        {[...Array(Math.round(product.rating.rate))].map(
                          (_, index) => (
                            <FontAwesomeIcon
                              key={index}
                              icon={faStar}
                              color="var(--color-accent)"
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}

                  <div className="quantity-selector d-flex align-items-center mb-3">
                    <button
                      className="btn btn-outline-var(--color-text) outlined-button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      tabIndex={0}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        transition: "background-color 0.3s ease",
                      }}
                      aria-label="Decrease Quantity"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                      className="form-control mx-2"
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, Number(e.target.value)))
                      }
                      min="1"
                      style={{ width: "40px", fontSize: "14px" }}
                      inputmode="numeric"
                      aria-label="Quantity Input"
                    />
                    <button
                      className="btn btn-outline-var(--color-text) outlined-button"
                      onClick={() => setQuantity(quantity + 1)}
                      tabIndex={0}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        transition: "background-color 0.3s ease",
                      }}
                      aria-label="Increase Quantity"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>

                  <button
                    className="btn mt-3 mx-auto d-block custom-button"
                    onClick={() => handleAddToCart(product, quantity)}
                    aria-label="Add to Cart Button"
                    style={{ fontSize: "16px", padding: "5px 10px" }}
                  >
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      style={{ fontSize: "12px" }}
                    />{" "}
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
