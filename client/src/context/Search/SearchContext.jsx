import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllProducts } from "../Product/ProductActions";

const SearchContext = createContext();

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [initialResults, setInitialResults] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await getAllProducts();
        setInitialResults(products);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, []);

  const resetSearch = () => {
    setSearchQuery("");
    setQueryResults([...initialResults]);
  };

  const executeSearch = (query) => {
    if (!query) {
      resetSearch();
      return;
    }

    const results = initialResults.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );

    setQueryResults(results);
  };

  const contextValue = {
    searchQuery,
    setSearchQuery,
    queryResults,
    executeSearch,
    resetSearch,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}
