"use client";

import Image from "next/image";
import Link from "next/link";
import ProtectedRoute from "../components/ProtectedRoute";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types";

export default function CartPage() {
  const { cartItems, removeFromCart, addToCart } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  const updateQuantity = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(item.id);
      return;
    }

    removeFromCart(item.id);
    for (let i = 0; i < newQuantity; i += 1) {
      addToCart(item);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <span className="text-gray-600">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </span>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 text-gray-400">🛒</div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Looks like you haven&apos;t added any items to your cart yet. Start shopping to
                discover amazing products!
              </p>
              <Link href="/Products">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition shadow-lg hover:shadow-xl">
                  Start Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="bg-white rounded-3xl shadow-lg p-6 flex items-center space-x-6 transition hover:shadow-xl"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="w-24 h-24 object-contain flex-shrink-0 bg-gray-50 rounded-2xl p-2"
                    />

                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2">{item.title}</h3>
                      <p className="text-2xl font-bold text-blue-600 mb-3">${item.price}</p>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-xl px-3 py-1">
                          <button
                            onClick={() => updateQuantity(item, (item.quantity || 1) - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition"
                          >
                            -
                          </button>
                          <span className="font-semibold text-gray-700 min-w-8 text-center">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(item, (item.quantity || 1) + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-600 font-semibold transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link href="/Checkout">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition shadow-lg hover:shadow-xl">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
