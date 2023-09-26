import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/Cart/CartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  getLocalStorageCart,
  setLocalStorageCart,
} from "../context/Cart/CartActions";

const Cart = () => {
  const { cart, dispatch, removeFromCart, emptyCart, checkout } = useCart();
  const [quantityInputs, setQuantityInputs] = useState({});
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  useEffect(() => {
    const storedCart = getLocalStorageCart();
    if (storedCart && storedCart.length > 0) {
      dispatch({ type: "INITIALIZE_CART", cart: storedCart });
    }
  }, [dispatch]);

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
    if (newQuantity < 0) {
      newQuantity = 0;
    }

    setQuantityInputs((prevInputs) => ({
      ...prevInputs,
      [productId]: newQuantity,
    }));
  };

  const handleUpdateCartProduct = () => {
    const updatedCart = cart.map((product) => {
      if (quantityInputs[product.id] !== undefined) {
        return {
          ...product,
          quantity: quantityInputs[product.id],
        };
      }
      return product;
    });

    dispatch({ type: "UPDATE_CART", cart: updatedCart });

    setQuantityInputs({});
  };

  const calculateTotal = () => {
    return cart.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  };
  return (
    <section
      className="vh-100"
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
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={{
                          backgroundColor: "var(--color-background)",
                          borderColor: "var(--color-border)",
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
                        <span style={{ color: "var(--color-accent)" }}>
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
                    style={{ color: "var(--color-accent)" }}
                    aria-label={`Total Price: $${calculateTotal().toFixed(2)}`}
                  >
                    Total: ${calculateTotal().toFixed(2)}
                  </strong>
                </div>
                <div className="mt-3 float-end">
                  <button
                    onClick={handleUpdateCartProduct}
                    className="btn btn-lg btn-block me-2 custom-button"
                    aria-label="Update Cart Button"
                  >
                    Update Cart
                  </button>

                  <Link
                    to="/order-details"
                    className="btn btn-lg btn-block custom-button"
                    aria-label="Proceed to Order Details Button"
                  >
                    Proceed to Order Details
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
