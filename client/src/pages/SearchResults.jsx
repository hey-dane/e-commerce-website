import React from "react";
import IndexCard from "../components/IndexCard";
import { useParams } from "react-router-dom";

function SearchResult({ queryResults }) {
  const { query } = useParams();

  if (!queryResults) {
    return <div aria-label="Loading">Loading...</div>;
  }

  return (
    <div>
      <div
        style={{ display: "flex", flexWrap: "wrap" }}
        aria-label="Search Results"
      >
        {queryResults.map((product) => (
          <IndexCard
            key={product.id}
            product={product}
            aria-label={`Product: ${product.title}`}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
