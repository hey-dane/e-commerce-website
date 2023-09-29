import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/Cart/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const { cart, removeFromCart, updateCartProduct, initializeCart, emptyCart } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [quantityInputs, setQuantityInputs] = useState({});

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    setQuantityInputs((prevInputs) => ({
      ...prevInputs,
      [productId]: undefined,
    }));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (isNaN(newQuantity) || newQuantity < 0) {
      newQuantity = "";
    }
    setQuantityInputs((prevInputs) => ({
      ...prevInputs,
      [productId]: newQuantity,
    }));
  };

  const handleUpdateCartProduct = () => {
    Object.entries(quantityInputs).forEach(([productId, newQuantity]) => {
      if (
        newQuantity !== undefined &&
        !isNaN(newQuantity) &&
        newQuantity >= 0
      ) {
        console.log(
          `Updating product ${productId} with quantity ${newQuantity}`
        );
        setQuantityInputs((prevInputs) => ({
          ...prevInputs,
          [productId]: newQuantity,
        }));
        updateCartProduct(productId, newQuantity);
      }
    });
    setQuantityInputs({});
  };

  const handleEmptyCart = () => {
    emptyCart();
  };

  const calculateTotal = () => {
    if (!cart || !cart.products) {
      return 0;
    }
    return cart.products.reduce((acc, product) => {
      return acc + (product.price || 0) * (product.quantity || 1);
    }, 0);
  };

  const handleProceed = () => {
    navigate("/order-details");
  };

  return (
    <section
      className="vh-100"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div
              className="card"
              style={{
                borderRadius: "1rem",
                borderColor: "var(--color-border)",
              }}
            >
              <div
                className="card-body p-3 p-lg-4"
                style={{ color: "var(--color-text)" }}
              >
                <h2
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: "1px", color: "var(--color-dark)" }}
                  aria-label="Shopping Cart Title"
                >
                  Shopping Cart
                </h2>

                {cart && cart.products && cart.products.length === 0 ? (
                  <div>Your cart is empty.</div>
                ) : (
                  <ul className="list-group">
                    {cart.products &&
                      cart.products.map((product) => (
                        <li
                          key={product.id}
                          className="list-group-item d-flex justify-content-between align-items-center flex-column flex-md-row my-2"
                          style={{
                            backgroundColor: "var(--color-background)",
                            borderColor: "var(--color-border)",
                            borderTop: "1px solid var(--color-border)",
                          }}
                          aria-label={`Product: ${product.title}`}
                        >
                          <div className="d-flex align-items-center">
                            <img
                              src={product.image}
                              alt={product.title}
                              style={{
                                width: "50px",
                                height: "50px",
                                marginRight: "10px",
                              }}
                              aria-label={`Product Image: ${product.title}`}
                            />
                            <Link
                              to={`/products/${product.id}`}
                              style={{
                                color: "var(--color-link)",
                                maxWidth: "300px",
                              }}
                              aria-label={`Product Title: ${product.title}`}
                            >
                              {product.title}
                            </Link>
                          </div>
                          <div className="d-flex align-items-center mt-3 mt-md-0">
                            <span
                              style={{
                                color: "var(--color-border)",
                                padding: "10px",
                              }}
                            >
                              ${product.price} x {product.quantity}
                            </span>
                            <div className="input-group mt-2 mt-md-0">
                              <input
                                type="number"
                                value={quantityInputs[product.id] || ""}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    product.id,
                                    parseInt(e.target.value)
                                  )
                                }
                                className="form-control"
                                style={{ maxWidth: "70px" }}
                                aria-label={`Quantity Input for ${product.title}`}
                              />
                              <button
                                className="btn btn-lg"
                                onClick={() => handleRemoveFromCart(product.id)}
                                style={{
                                  backgroundColor: "var(--color-background)",
                                  color: "var(--color-text)",
                                  marginLeft: "10px",
                                }}
                                aria-label={`Remove Product: ${product.title}`}
                              >
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  style={{ color: "var(--color-text)" }}
                                  aria-label={`Trash Can Icon for ${product.title}`}
                                />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
                <div className="mt-3 mb-4">
                  <strong
                    style={{ color: "var(--color-border)" }}
                    aria-label={`Total Price: $${calculateTotal().toFixed(2)}`}
                  >
                    Total: ${calculateTotal().toFixed(2)}
                  </strong>
                </div>
                <div className="mt-3 text-center">
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      onClick={handleUpdateCartProduct}
                      className="btn btn-lg custom-button mb-2"
                      style={{ fontSize: "20px" }}
                      aria-label="Update Cart Button"
                    >
                      Update Cart
                    </button>
                    <button
                      onClick={handleEmptyCart}
                      className="btn btn-lg custom-button mb-2"
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      aria-label="Empty Cart Button"
                    >
                      Empty Cart
                    </button>
                    <button
                      onClick={handleProceed}
                      className="btn btn-lg custom-button mb-2"
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      aria-label="Proceed to Order Details Button"
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
