"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const { searchTerm } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const PRODUCTS_API = "https://fakestoreapi.com/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(PRODUCTS_API);
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Products
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
