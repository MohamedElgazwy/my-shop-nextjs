"use client";

import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useCart } from "../context/CartContext";

interface CheckoutForm {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState<CheckoutForm>({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors: Partial<CheckoutForm> = {};
    if (!formData.name) newErrors.name = "Please enter your name";
    if (!formData.address) newErrors.address = "Please enter your address";
    if (!formData.city) newErrors.city = "Please enter your city";
    if (!formData.postalCode) newErrors.postalCode = "Please enter your postal code";
    if (!formData.cardNumber) newErrors.cardNumber = "Please enter card number";
    if (!formData.expiry) newErrors.expiry = "Please enter expiry date";
    if (!formData.cvv) newErrors.cvv = "Please enter CVV";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    alert("Order placed successfully!");
    clearCart();
    router.push("/Products");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Your cart is empty.</h2>
        <a href="/Products" className="text-blue-600 underline">Go to Products</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-6 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">Checkout</h1>
        <div className="mb-6 sm:mb-8 bg-white border p-4 sm:p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between text-sm sm:text-base">
                <span className="flex-1">{item.title} x {item.quantity || 1}</span>
                <span className="font-semibold">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t mt-4 pt-3 flex justify-between font-bold text-lg"><span>Total:</span><span>${totalPrice.toFixed(2)}</span></div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold">Shipping Information</h2>
          {(["name", "address", "city", "postalCode", "cardNumber", "expiry", "cvv"] as const).map((field) => (
            <div key={field}>
              <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base">{field}</label>
              <input
                type={field === "cvv" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
              />
              {errors[field] && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}

          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 sm:py-4 rounded-xl font-semibold">Place Order</button>
        </form>
      </div>
    </div>
  );
}
