import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSearch } from "./context/Search/SearchContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import Login from "./pages/Login";
import SingleProductView from "./pages/SingleProductView";
import Categories from "./components/Categories";
import Cart from "./pages/ShoppingCart";
import SearchResult from "./pages/SearchResults";
import Payment from "./components/Payment";
import Completion from "./components/Completion";
import OrderDetails from "./components/OrderDetails";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const { queryResults } = useSearch();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/category/:categoryName" element={<Categories />} />
        <Route path="/products/:id" element={<SingleProductView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/search"
          element={<SearchResult queryResults={queryResults} />}
        />
        <Route
          path="/order-details"
          element={<OrderDetails addressTypes={["Billing", "Shipping"]} />}
        />
        <Route path="/payment" element={<Payment />} />
        <Route path="/completion" element={<Completion />} />
      </Routes>
    </>
  );
}

export default App;