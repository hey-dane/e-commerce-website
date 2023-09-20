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
  const {
    cart,
    dispatch,
    removeFromCart,
    emptyCart,
    updateCartProduct,
    checkout,
  } = useCart();
  const [updatedCart, setUpdatedCart] = useState([...cart]);
  const [quantityInputs, setQuantityInputs] = useState({});
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  useEffect(() => {
    const storedCart = getLocalStorageCart();
    if (storedCart && storedCart.length > 0) {
      dispatch({ type: "INITIALIZE_CART", cart: storedCart });
      setUpdatedCart([...storedCart]);
    }
  }, [dispatch]);

  useEffect(() => {
    setLocalStorageCart(updatedCart);
  }, [updatedCart]);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    setUpdatedCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId)
    );
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
  const handleUpdateCart = () => {
    const updated = updatedCart.map((product) => {
      // If the user has updated the quantity of the product
      if (quantityInputs[product.id]) {
        // Update the cart context with the new quantity
        updateCartProduct(product.id, quantityInputs[product.id]);
      }
      return {
        ...product,
        quantity: quantityInputs[product.id] || product.quantity,
      };
    });

    setUpdatedCart(updated);
    setQuantityInputs({});
  };

  const calculateTotal = () => {
    return cart.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-4 p-lg-5 text-black">
                <h2
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Shopping Cart
                </h2>
                {cart.length === 0 ? (
                  <div>Your cart is empty.</div>
                ) : (
                  <ul className="list-group">
                    {updatedCart.map((product, index) => (
                      <li
                        key={product.id || index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{
                            width: "50px",
                            height: "50px",
                            marginRight: "10px",
                          }}
                        />
                        <span className="flex-grow-1">
                          <Link to={`/products/${product.id}`}>
                            {product.title}
                          </Link>
                        </span>
                        ${product.price} x {product.quantity}
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
                        />
                        <button
                          className="btn btn-lg"
                          onClick={() => handleRemoveFromCart(product.id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            style={{ color: "#9A616D" }}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-3 mb-4">
                  <strong>Total: ${calculateTotal().toFixed(2)}</strong>
                </div>
                <div className="mt-3 float-end">
                  <button
                    onClick={handleUpdateCart}
                    className="btn btn-dark btn-lg btn-block me-2"
                  >
                    Update Cart
                  </button>

                  <Link to="/order-details" className="btn btn-dark btn-lg ">
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
