import React from "react";
import { ShoppingCart, Heart, Home, Info } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border border-purple-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
              SS
            </div>
            <h1 className="text-xl font-semibold text-white">StoreSync</h1>
          </div>
          <p className="max-w-xl text-white text-sm mt-2">
            We’re your one-stop destination for quality products, unbeatable prices, and seamless shopping.
            From the <em>latest tech</em> to daily essentials, we bring everything you need right to your fingertips.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-center gap-8 text-white font-medium flex-wrap">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            <Home size={18} />
            Home
          </Link>
          <Link
            to="/wishlist"
            className="flex items-center gap-1 hover:text-pink-500 transition-colors"
          >
            <Heart size={18} />
            Wishlist
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-1 hover:text-green-500 transition-colors"
          >
            <ShoppingCart size={18} />
            Cart
          </Link>
          <Link
            to="/details"
            className="flex items-center gap-1 hover:text-gray-600 transition-colors"
          >
            <Info size={18} />
            Details
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-xs text-gray-600">
          © 2025 StoreSync. By Mohammed shanid.T
        </div>
      </div>
    </footer>
  );
}
