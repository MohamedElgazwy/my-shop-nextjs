"use client";

import { useCart } from "../context/CartContext";
import { useState } from "react";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product);

    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsAdding(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-100 group">
      <div className="relative w-full h-64 mb-6 overflow-hidden rounded-2xl bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow w-full space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition">
          {product.title}
        </h2>

        <div className="flex items-center justify-between mt-auto">
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ${product.price}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
              isAdding
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            {isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <span>+</span>
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
