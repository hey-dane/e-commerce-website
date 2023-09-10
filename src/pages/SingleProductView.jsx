import React, { useState, useEffect } from "react";
import { getSingleProduct } from "../Product/ProductActions";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext";

export default function SingleProductView() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState(""); // Initialize currentCategory state

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await getSingleProduct(id);
        setProduct(productData);
        setCurrentCategory(productData.category);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <div key={product.id}>
      <h2>{product.title}</h2>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      <img src={product.image} alt={product.title} />
      <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
    </div>
  );
}
