"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminPage() {
  const { isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) router.push("/Products");
  }, [isAdmin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* ===== Header ===== */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Manage products, orders and users from one place
        </p>
      </div>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-600 font-medium">Products</h2>
            <span className="text-3xl">📦</span>
          </div>
          <p className="text-4xl font-bold mt-4 text-gray-800">20</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-600 font-medium">Orders</h2>
            <span className="text-3xl">🧾</span>
          </div>
          <p className="text-4xl font-bold mt-4 text-gray-800">5</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-600 font-medium">Users</h2>
            <span className="text-3xl">👤</span>
          </div>
          <p className="text-4xl font-bold mt-4 text-gray-800">12</p>
        </div>
      </div>

      {/* ===== Actions ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/products">
          <div className="group bg-white rounded-2xl p-6 shadow hover:shadow-xl transition cursor-pointer border border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Manage Products
              </h2>
              <span className="text-2xl group-hover:translate-x-1 transition">
                ➜
              </span>
            </div>
            <p className="text-gray-600 mt-2">Add, edit or delete products</p>
          </div>
        </Link>

        <div className="bg-white rounded-2xl p-6 shadow border border-gray-100 opacity-60 cursor-not-allowed">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Manage Orders
            </h2>
            <span className="text-2xl">🔒</span>
          </div>
          <p className="text-gray-500 mt-2">Coming soon (NestJS backend)</p>
        </div>
      </div>
    </div>
  );
}
