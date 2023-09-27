import React, { useState, useContext } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "../context/Cart/CartContext";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { patch, checkout } = useCart();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [nameOnCard, setNameOnCard] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (!stripe || !elements) {
        throw new Error("Stripe or Elements is not loaded");
      }

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/completion`,
        },
        cart: cart,
      });

      if (!error) {
        checkout();
        setMessage("Payment successful!");
        window.location.href = "/cart";
      } else {
        throw error;
      }
    } catch (confirmationError) {
      setMessage(confirmationError.message);
      console.error("Error during payment confirmation:", confirmationError);
    } finally {
      setIsProcessing(false);
    }
  };

  const cartTotal = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <div
      className="container-fluid vh-100"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-10 col-lg-8">
          <div
            className="card"
            style={{ borderRadius: "1rem", borderColor: "var(--color-border)" }}
          >
            <div className="d-flex align-items-center mb-3 pb-1">
              <span className="h1 fw-bold mb-0">
                <img
                  src="https://placehold.co/200x100/FFF/3c1642/?text=shop."
                  alt="Logo"
                  style={{ borderRadius: "1rem" }}
                />
              </span>
            </div>
            <div className="cart">
              <h2 className="ms-4" style={{ color: "var(--color-text)" }}>
                Your Cart
              </h2>
              <ul style={{ color: "var(--color-text)" }}>
                {cart.map((product) => (
                  <li key={product.id} style={{ color: "var(--color-text)" }}>
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                      }}
                    />
                    <span style={{ color: "var(--color-text)" }}>
                      {product.title} x {product.quantity} - $
                      {product.price * product.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cart total */}
            <div
              className="cart-total ms-4"
              style={{ color: "var(--color-accent)" }}
            >
              <h3>Total: ${cartTotal.toFixed(2)}</h3>
            </div>
            <div
              className="card-body p-4 p-lg-5"
              style={{ color: "var(--color-text)" }}
            >
              <form id="payment-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="nameOnCard"
                    className="form-label"
                    style={{ color: "var(--color-text)" }}
                  >
                    Name on Card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameOnCard"
                    name="nameOnCard"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    required
                  />
                </div>

                <PaymentElement id="payment-element" />

                <button
                  disabled={isProcessing || !stripe || !elements}
                  id="submit"
                  className="btn btn-lg btn-block mt-3 custom-button"
                >
                  <span id="button-text" style={{ color: "var(--color-text)" }}>
                    {isProcessing ? "Processing ... " : "Pay now"}
                  </span>
                </button>

                {message && (
                  <div
                    id="payment-message"
                    style={{ color: "var(--color-text)" }}
                  >
                    {message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
