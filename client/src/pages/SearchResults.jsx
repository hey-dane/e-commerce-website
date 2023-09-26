import React from "react";
import IndexCard from "../components/IndexCard";
import { useParams } from "react-router-dom";
import { useSearch } from "../context/Search/SearchContext";

function SearchResult() {
  const { query } = useParams();
  const { queryResults } = useSearch();

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
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
