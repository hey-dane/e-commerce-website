import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext";
import { ProductProvider } from "./Product/ProductContext";
import { SearchProvider } from "./components/SearchContext";
import { CartProvider } from "./Cart/CartContext";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <SearchProvider>
          <ProductProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ProductProvider>
        </SearchProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
