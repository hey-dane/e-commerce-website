import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth/AuthContext";
import { ProductProvider } from "./context/Product/ProductContext";
import { SearchProvider } from "./context/Search/SearchContext";
import { CartProvider } from "./context/Cart/CartContext";
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
