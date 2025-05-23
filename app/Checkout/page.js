"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext"; // عدل المسار حسب مشروعك
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  // حالة بيانات النموذج
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // حالة الأخطاء البسيطة
  const [errors, setErrors] = useState({});

  // حساب السعر الكلي
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // تحديث الحقول
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // تحقق بسيط من صحة البيانات
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

  // عند الضغط على زر الدفع
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // هنا ممكن تضيف منطق إرسال الطلب للسيرفر (API)

    alert("Order placed successfully!");
    clearCart(); // تنظيف العربة بعد الطلب
    router.push("/Products"); // تحويل لصفحة المنتجات
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty.</h2>
        <a href="/Products" className="text-blue-600 underline">
          Go to Products
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* عرض تفاصيل العربة */}
      <div className="mb-8 border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between mb-2">
              <span>
                {item.title} x {item.quantity || 1}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold border-t pt-2 mt-2">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* نموذج بيانات الدفع والشحن */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold">Shipping Information</h2>
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.address && (
            <p className="text-red-600 text-sm">{errors.address}</p>
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.city && (
              <p className="text-red-600 text-sm">{errors.city}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.postalCode && (
              <p className="text-red-600 text-sm">{errors.postalCode}</p>
            )}
          </div>
        </div>

        <h2 className="text-xl font-semibold">Payment Details</h2>

        <div>
          <label className="block mb-1 font-medium">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            maxLength={16}
            placeholder="1234 5678 9012 3456"
          />
          {errors.cardNumber && (
            <p className="text-red-600 text-sm">{errors.cardNumber}</p>
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Expiry Date</label>
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="MM/YY"
              maxLength={5}
            />
            {errors.expiry && (
              <p className="text-red-600 text-sm">{errors.expiry}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium">CVV</label>
            <input
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              maxLength={4}
            />
            {errors.cvv && <p className="text-red-600 text-sm">{errors.cvv}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-500 transition w-full"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
