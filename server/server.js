const express = require("express");
const path = require("path");
const port = 8000;
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173", // Replace with the correct frontend origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions)); // Place this before your route definitions

app.use(express.static(path.resolve(__dirname, "../client")));

app.get("/", (req, res) => {
  const filePath = path.resolve(__dirname, "../client/index.html");
  res.sendFile(filePath);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: 1999,
    });

    // Log the Stripe API response

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    console.error("Error in /create-payment-intent:", e);

    // Log the error and send an error response to the client
    res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
