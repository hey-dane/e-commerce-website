import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useCart, CartContext } from "../context/Cart/CartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  getLocalStorageCart,
  setLocalStorageCart,
} from "../context/Cart/CartActions";

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);

  const { patch, removeFromCart, emptyCart, checkout } = useCart();
  console.log("Cart Contents:", cart);

  const [quantityInputs, setQuantityInputs] = useState({});

  useEffect(() => {
    const storedCart = getLocalStorageCart();
    if (storedCart && storedCart.length > 0) {
      dispatch({ type: "INITIALIZE_CART", cart: storedCart });
    }
  }, []);

  useEffect(() => {
    setLocalStorageCart(cart);
  }, [cart]);

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
        dispatch({
          type: "UPDATE_CART_PRODUCT",
          productId: parseInt(productId),
          newQuantity,
        });
      }
    });
    setQuantityInputs({});
  };

  const calculateTotal = () => {
    return cart.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  };

  return (
    <section
      className="vh-80"
      style={{ backgroundColor: "var(--color-background)" }}
      aria-label="Shopping Cart Section"
    >
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-12">
            <div
              className="card"
              style={{
                borderRadius: "1rem",
                borderColor: "var(--color-border)",
              }}
            >
              <div
                className="card-body p-4 p-lg-5"
                style={{ color: "var(--color-text)" }}
              >
                <h2
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: "1px", color: "var(--color-dark)" }}
                  aria-label="Shopping Cart Title"
                >
                  Shopping Cart
                </h2>
                {cart.length === 0 ? (
                  <div>Your cart is empty.</div>
                ) : (
                  <ul className="list-group">
                    {cart.map((product, index) => (
                      <li
                        key={product.id || index}
                        className="list-group-item d-flex justify-content-between align-items-center my-2"
                        style={{
                          backgroundColor: "var(--color-background)",
                          borderColor: "var(--color-border)",
                          borderTop: "1px solid var(--color-border)",
                        }}
                        aria-label={`Product: ${product.title}`}
                      >
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
                        <span className="flex-grow-1">
                          <Link
                            to={`/products/${product.id}`}
                            style={{ color: "var(--color-link)" }}
                            aria-label={`Product Title: ${product.title}`}
                          >
                            {product.title}
                          </Link>
                        </span>
                        <span style={{ color: "var(--color-border)" }}>
                          ${product.price} x {product.quantity}
                        </span>
                        <input
                          type="number"
                          value={quantityInputs[product.id] || ""}
                          onChange={(e) =>
                            handleQuantityChange(
                              product.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="form-control mx-2"
                          style={{ width: "70px" }}
                          aria-label={`Quantity Input for ${product.title}`}
                        />
                        <button
                          className="btn btn-lg"
                          onClick={() => handleRemoveFromCart(product.id)}
                          style={{
                            backgroundColor: "var(--color-background)",
                            color: "var(--color-text)",
                          }}
                          aria-label={`Remove Product: ${product.title}`}
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            style={{ color: "var(--color-text)" }}
                            aria-label={`Trash Can Icon for ${product.title}`}
                          />
                        </button>
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
                <div className="mt-3 float-end">
                  <button
                    onClick={handleUpdateCartProduct}
                    className="btn btn-lg btn-block me-2 custom-button mb-2"
                    style={{ width: "100%", fontSize: "20px" }}
                    aria-label="Update Cart Button"
                  >
                    Update Cart
                  </button>

                  <Link
                    to="/order-details"
                    className="btn btn-lg btn-block custom-button"
                    style={{ width: "100%", fontSize: "20px" }}
                    aria-label="Proceed to Order Details Button"
                  >
                    Proceed
                  </Link>
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
