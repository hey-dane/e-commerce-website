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

    console.log("Query Results:", results);

    setQueryResults(results);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        queryResults,
        executeSearch,
        resetSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

//added state variables for queryResults and initialResults:
//Implement useEffect to load initial product data:
//Add functions for search functionality:
//Pass the new state and functions in the context value:
