"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = (e) => {
    e.preventDefault();

    if (
      name.length >= 3 &&
      email.endsWith("@gmail.com") &&
      /^\d{11}$/.test(phone) &&
      password.length >= 6
    ) {
      toast.success("Account created successfully!");
      router.push("/Products");
    } else {
      toast.error("Please enter valid details");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={3}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="11-digit phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            pattern="\d{11}"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
