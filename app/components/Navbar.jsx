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

  return (
    <nav className="sticky top-0 text-black z-50 bg-white shadow-2xl">
      <div className="flex justify-between items-center px-4 py-2 md:px-8">
        <Link href="/Products">
          <h2 className="text-2xl font-bold cursor-pointer">My Shop</h2>
        </Link>

        <input
          className="hidden md:block border-2 rounded-2xl outline-0 md:w-80 py-1 px-3"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="hidden md:flex space-x-4 items-center">
          {isLoggedIn ? (
            <button onClick={logout} className="cursor-pointer">
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="cursor-pointer">Login</button>
            </Link>
          )}

          <Link href={isLoggedIn ? "/cart" : "/login"}>
            <button className="cursor-pointer">
              🛒{" "}
              {cartItems != 0 ? (
                <span className="absolute top-4 right-3 w-5 h-5 text-xs bg-red-600 text-white rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              ) : (
                <span></span>
              )}
            </button>
          </Link>
        </div>

        <button className="md:hidden text-3xl" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          {isLoggedIn ? (
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className="block w-full text-left"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button onClick={closeMenu} className="block w-full text-left">
                Login
              </button>
            </Link>
          )}

          <Link href={isLoggedIn ? "/cart" : "/login"}>
            <button onClick={closeMenu} className="block w-full text-left">
              🛒{" "}
              {cartItems != 0 ? (
                <span className="absolute-3 right-3 w-5 h-5 text-xs bg-red-600 text-white rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              ) : (
                <span></span>
              )}
              <span className="absolute-3 right-3 w-5 h-5 text-xs bg-red-600 text-white rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
