"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cartItems, searchTerm, setSearchTerm } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <nav className="sticky top-0 text-white z-50 bg-gradient-to-r from-blue-600 to-purple-700 shadow-2xl backdrop-blur-lg">
      <div className="container mx-auto px-2 py-2 sm:px-4 sm:py-3 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/Products">
            <div className="flex items-center space-x-2 cursor-pointer group">
              <h2 className="text-lg sm:text-2xl font-bold text-white group-hover:text-blue-100 transition">
                MyShop
              </h2>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-xl mx-4 lg:mx-8">
            <div className="relative">
              <input
                className="w-full border-0 rounded-2xl outline-0 py-2 md:py-3 px-4 md:px-6 bg-white/10 backdrop-blur-sm text-white text-sm md:text-base placeholder-blue-100 focus:bg-white/20 transition"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-100 text-sm md:text-base">
                🔍
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-3 lg:space-x-6 items-center">
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="cursor-pointer bg-white/10 hover:bg-white/20 px-3 md:px-4 py-2 rounded-xl text-sm md:text-base transition backdrop-blur-sm"
              >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <button className="cursor-pointer bg-white/10 hover:bg-white/20 px-3 md:px-4 py-2 rounded-xl text-sm md:text-base transition backdrop-blur-sm">
                  Login
                </button>
              </Link>
            )}

            <Link href={isLoggedIn ? "/cart" : "/login"}>
              <button className="cursor-pointer relative bg-white/10 hover:bg-white/20 p-2 md:p-3 rounded-xl transition backdrop-blur-sm">
                🛒
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 text-xs bg-red-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                    {totalItems}
                  </span>
                )}
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-xl sm:text-2xl bg-white/10 p-1.5 sm:p-2 rounded-lg hover:bg-white/20 transition"
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-2 sm:mt-3">
          <div className="relative">
            <input
              className="w-full border-0 rounded-2xl outline-0 py-2 px-3 sm:py-3 sm:px-6 bg-white/10 backdrop-blur-sm text-white text-sm sm:text-base placeholder-blue-100 focus:bg-white/20 transition"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-blue-100 text-sm">
              🔍
            </span>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 sm:mt-3 pb-2 sm:pb-4 space-y-2 sm:space-y-3 bg-white/5 rounded-2xl p-2 sm:p-4 backdrop-blur-sm">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="block w-full text-left bg-white/10 hover:bg-white/20 px-3 py-2 sm:px-4 sm:py-3 rounded-xl text-sm sm:text-base transition"
              >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <button
                  onClick={closeMenu}
                  className="block w-full text-left bg-white/10 hover:bg-white/20 px-3 py-2 sm:px-4 sm:py-3 rounded-xl text-sm sm:text-base transition"
                >
                  Login
                </button>
              </Link>
            )}

            <Link href={isLoggedIn ? "/cart" : "/login"}>
              <button
                onClick={closeMenu}
                className="block w-full text-left bg-white/10 hover:bg-white/20 px-3 py-2 sm:px-4 sm:py-3 rounded-xl text-sm sm:text-base transition relative"
              >
                🛒 Cart
                {totalItems > 0 && (
                  <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-xs bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
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
