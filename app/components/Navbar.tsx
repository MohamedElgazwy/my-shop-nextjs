"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cartItems, searchTerm, setSearchTerm } = useCart();
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-2xl backdrop-blur-lg">
      <div className="container mx-auto px-3 py-2 md:px-6 md:py-3">
        {/* ================= Top Bar ================= */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/Products" onClick={closeMenu}>
            <h2 className="text-xl md:text-2xl font-bold cursor-pointer">
              MyShop
            </h2>
          </Link>

          {/* Search (Desktop) */}
          <div className="hidden md:block flex-1 max-w-xl mx-6">
            <div className="relative">
              <input
                className="w-full rounded-2xl px-5 py-3 bg-white/10 backdrop-blur-sm text-white placeholder-blue-100 outline-none focus:bg-white/20 transition"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                🔍
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {/* Admin Button */}
            {isAdmin && (
              <Link href="/admin">
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold hover:bg-yellow-300 transition">
                  Admin
                </button>
              </Link>
            )}

            {/* Auth */}
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition"
              >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition">
                  Login
                </button>
              </Link>
            )}

            {/* Cart */}
            <Link href={isLoggedIn ? "/cart" : "/login"}>
              <button className="relative bg-white/10 hover:bg-white/20 p-3 rounded-xl transition">
                🛒
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 text-xs bg-red-500 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl bg-white/10 p-2 rounded-lg hover:bg-white/20 transition"
          >
            ☰
          </button>
        </div>

        {/* ================= Mobile Search ================= */}
        <div className="md:hidden mt-3">
          <input
            className="w-full rounded-2xl px-4 py-2 bg-white/10 backdrop-blur-sm text-white placeholder-blue-100 outline-none focus:bg-white/20 transition"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ================= Mobile Menu ================= */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            {isAdmin && (
              <Link href="/admin" onClick={closeMenu}>
                <button className="w-full bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold">
                  Admin Dashboard
                </button>
              </Link>
            )}

            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="w-full bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" onClick={closeMenu}>
                <button className="w-full bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition">
                  Login
                </button>
              </Link>
            )}

            <Link href={isLoggedIn ? "/cart" : "/login"} onClick={closeMenu}>
              <button className="w-full bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition relative">
                🛒 Cart
                {totalItems > 0 && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-xs bg-red-500 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
