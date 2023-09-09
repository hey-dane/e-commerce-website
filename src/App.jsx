import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";
import AllProducts from "./pages/AllProducts";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./pages/Login";
import RegistrationForm from "./components/RegistrationForm";
import SingleProductView from "./pages/SingleProductView";
import Categories from "./components/Categories";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/category/:categoryName" element={<Categories />} />
        <Route path="/products/:id" element={<SingleProductView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrationform" element={<RegistrationForm />} />
      </Routes>
    </>
  );
}

export default App;
