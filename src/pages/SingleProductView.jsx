import React, { useState, useEffect } from "react";
import { useAuth } from "../Auth/AuthContext";
import { getSingleProduct } from "../Product/ProductActions";
import { useParams } from "react-router-dom";

export default function SingleProductView() {
  const [product, setProduct] = useState({});
  const { addToCart } = useAuth();
  const { id } = useParams(); // Get the id from the route

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await getSingleProduct(id);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [id]);

  if (!product) {
    return <div>Loading product...</div>;
  }

  const handleAddToCart = () => {
    const productToAdd = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
    };
    addToCart(productToAdd);
  };

  return (
    <div key={product.id}>
      <h2>{product.title}</h2>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      <img src={product.image} alt={product.title} />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
