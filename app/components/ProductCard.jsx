"use client";

import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition hover:shadow-2xl">
      <img
        src={product.image}
        alt={product.title}
        className="h-60 w-60 object-contain mb-4"
      />
      <h2 className="text-md font-semibold text-center text-gray-800 mb-2 line-clamp-2">
        {product.title}
      </h2>
      <p className="text-blue-600 font-bold mb-3 text-lg">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
