import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
export default function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null); // Add an error state

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
      body: JSON.stringify({
        amount: 1999, // Replace with the actual amount to charge
        currency: "USD", // Replace with the desired currency
        // Add other payment details as needed
      }),
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
        setError(error.message); // Set error state
        console.error("Fetch /create-payment-intent error:", error.message);
        // Display the error message to the user or handle it appropriately
      });
  }, []);

  return (
    <>
      {error && <div>Error: {error}</div>} {/* Display error message */}
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}
