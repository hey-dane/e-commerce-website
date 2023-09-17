import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";
import AllProducts from "./pages/AllProducts";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./pages/Login";
import SingleProductView from "./pages/SingleProductView";
import Categories from "./components/Categories";
import Cart from "./pages/Cart";
import SearchResult from "./pages/SearchResults";
import { useSearch } from "./context/Search/SearchContext";

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
      </Routes>
    </>
  );
}

export default App;
