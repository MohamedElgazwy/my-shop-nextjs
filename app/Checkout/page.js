// app/checkout/page.js
"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Please enter your name";
    if (!formData.address) newErrors.address = "Please enter your address";
    if (!formData.city) newErrors.city = "Please enter your city";
    if (!formData.postalCode)
      newErrors.postalCode = "Please enter your postal code";
    if (!formData.cardNumber) newErrors.cardNumber = "Please enter card number";
    if (!formData.expiry) newErrors.expiry = "Please enter expiry date";
    if (!formData.cvv) newErrors.cvv = "Please enter CVV";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    alert("Order placed successfully!");
    clearCart();
    router.push("/Products");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Your cart is empty.
        </h2>
        <a href="/Products" className="text-blue-600 underline">
          Go to Products
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-6 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
          Checkout
        </h1>

        {/* Order Summary */}
        <div className="mb-6 sm:mb-8 bg-white border p-4 sm:p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Order Summary
          </h2>
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between text-sm sm:text-base"
              >
                <span className="flex-1">
                  {item.title} x {item.quantity || 1}
                </span>
                <span className="ml-4 font-semibold">
                  ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold border-t pt-3 mt-3 text-base sm:text-lg">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg space-y-4 sm:space-y-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold">
            Shipping Information
          </h2>

          <div>
            <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.name && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.address && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">
                {errors.address}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.city && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">
                  {errors.city}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.postalCode && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">
                  {errors.postalCode}
                </p>
              )}
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-semibold pt-4 border-t">
            Payment Details
          </h2>

          <div>
            <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={16}
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">
                {errors.cardNumber}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                className="w-full border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.expiry && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">
                  {errors.expiry}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                CVV
              </label>
              <input
                type="password"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="w-full border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={4}
              />
              {errors.cvv && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">
                  {errors.cvv}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 sm:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
