import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { CartContext } from "../context/Cart/CartContext";
import React, { useContext } from "react";

export default function Payment() {
  const { cartQuantity } = useContext(CartContext);

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8000/config")
      .then(async (r) => {
        const { publishableKey } = await r.json();
        setStripePromise(loadStripe(publishableKey));
      })
      .catch((error) => {
        console.error("Fetch /config error:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({ cartQuantity }),
    })
      .then(async (result) => {
        if (!result.ok) {
          const errorResponse = await result.json();
          throw new Error(errorResponse.error.message);
        }

        const { clientSecret } = await result.json();
        setClientSecret(clientSecret);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Fetch /create-payment-intent error:", error.message);
      });
  }, [cartQuantity]);

  return (
    <>
      {error && <div>Error: {error}</div>}
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            clientSecret={clientSecret}
            cartQuantity={cartQuantity}
          />
        </Elements>
      )}
    </>
  );
}
