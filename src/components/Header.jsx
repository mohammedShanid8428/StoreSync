import React from "react";
import { ShoppingCart, Heart, Home, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Header() {
  const { cart } = useSelector(state => state.cartSlice)
  const { wishlist } = useSelector(state => state.wishSlice)
  return (
    <header className="bg-slate-950 border border-purple-800 text-white shadow-md w-full sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 py-7 flex justify-between items-center">
        {/* Left - Logo */}
        <div className="text-3xl font-bold text-white flex gap-2">
          <img src="data:image/png;base64,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" alt="" className="w-12 h-12 " />
          <Link to="/">StoreSync</Link>
        </div>

        {/* Center - Navigation */}
        <nav className="flex gap-6 items-center text-white font-medium">
          <Link
            to="/"
            className="hover:text-yellow-500 flex items-center gap-1 text-lg transition-colors duration-200"
          >
            <Home className="w-5 h-5" />
            Landing
          </Link>
          <Link
            to="/cart"
            className="hover:text-yellow-500 flex items-center text-lg gap-1 transition-colors duration-200"
          >
            <ShoppingCart className="w-5 h-5" />
            Cart
          </Link>
          <Link
            to="/details"
            className="hover:text-yellow-500 flex items-center text-lg gap-1 transition-colors duration-200"
          >
            <Info className="w-5 h-5" />
            Details
          </Link>
          <Link
            to="/wishlist"
            className="hover:text-yellow-500 flex items-center text-lg gap-1 transition-colors duration-200"
          >
            <Heart className="w-5 h-5" />
            Wishlist
          </Link>
        </nav>

        {/* Right - Cart & Wishlist icons with badges */}
        <div className="flex items-center lg:order-2">
          <Link
            to={'/wishlist'}
            className="text-white  text-lg px-3  hover:text-yellow-500  group">
            Whishlist
            <span className='py-0.5 px-2  rounded-full bg-yellow-500 text-black'>{wishlist.length}</span>
          </Link>
          <Link
            to={'/cart'}
            className="text-white  text-lg px-3 ">
            Cart
            <span className='py-0.5 px-2  rounded-full bg-yellow-500 text-black '>{cart.length}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
