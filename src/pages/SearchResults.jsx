import React from "react";
import IndexCard from "../components/IndexCard";
import { useParams } from "react-router-dom";

function SearchResult({ queryResults }) {
  console.log("queryResults received:", queryResults);

  const { query } = useParams();

  if (!queryResults) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {queryResults.map((product) => (
          <IndexCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
