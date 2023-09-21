import React, { useState, useContext } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "../context/Cart/CartContext"; // Only import useCart

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, dispatch, checkout } = useCart(); // Access cart methods directly from useCart

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [nameOnCard, setNameOnCard] = useState(""); // Add state for the name on card
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
          // Again, ensure if you need the clientSecret here
          return_url: `${window.location.origin}/completion`,
        },
      });

      if (!error) {
        checkout();
        setMessage("Payment successful!");
        // If not using navigate or useHistory, utilize:
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

  return (
    <div
      className="container-fluid vh-100"
      style={{ backgroundColor: "#9A616D" }}
    >
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-10 col-lg-8">
          <div className="card" style={{ borderRadius: "1rem" }}>
            <div className="d-flex align-items-center mb-3 pb-1">
              <span className="h1 fw-bold mb-0">
                <img
                  src="https://placehold.co/200x100/FFF/9A616D/?text=shop."
                  alt="Logo"
                  style={{ borderRadius: "1rem" }}
                />
              </span>
            </div>
            <div className="card-body p-4 p-lg-5 text-black">
              <form id="payment-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nameOnCard" className="form-label">
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
                  className="btn btn-dark btn-lg btn-block mt-3"
                >
                  <span id="button-text">
                    {isProcessing ? "Processing ... " : "Pay now"}
                  </span>
                </button>

                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
