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
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-3 sm:p-6 flex flex-col items-center transition-all duration-300 hover:shadow-xl sm:hover:shadow-2xl hover:scale-105 border border-gray-100 group">
      <div className="relative w-full h-40 sm:h-64 mb-3 sm:mb-6 overflow-hidden rounded-xl sm:rounded-2xl bg-gray-50">
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

      <div className="flex flex-col flex-grow w-full space-y-2 sm:space-y-4">
        <h2 className="text-sm sm:text-lg font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition">
          {product.title}
        </h2>

        <div className="flex items-center justify-between mt-auto gap-2">
          <p className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ${product.price}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center space-x-1 sm:space-x-2 whitespace-nowrap ${
              isAdding
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl"
            }`}
          >
            {isAdding ? (
              <>
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden sm:inline">Adding...</span>
              </>
            ) : (
              <>
                <span>+</span>
                <span className="hidden sm:inline">Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
