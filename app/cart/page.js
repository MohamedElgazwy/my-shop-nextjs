"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import ProtectedRoute from "../components/ProtectedRoute";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cartItems.map((item, index) => (
                <div key={index} className="border rounded p-4 text-center">
                  <img src={item.image} className="w-60 h-60 mx-auto mb-2" />
                  <h2>{item.title}</h2>
                  <p>${item.price}</p>
                  <p className="text-red-500">
                    {item.quantity} {"  "}
                    <span className="text-black">pieces</span>
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link href="/Checkout">
                <button className="bg-green-600 text-white px-6 py-2 rounded">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
