import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsThunk,
  search,
  previousPage,
  nextPage,
} from "../redux/slices/productslice";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist } from "../redux/slices/wishSlice";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";

export default function Landing() {
  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    currentPage,
    productsPerPage,
    productDupe,
  } = useSelector((state) => state.productSlice);

  const totalPage = Math.ceil(productDupe.length / productsPerPage);
  const firstIndex = (currentPage - 1) * productsPerPage;
  const lastIndex = currentPage * productsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const handlePrev = () => dispatch(previousPage());
  const handleNext = () => dispatch(nextPage());

  return (
    <section className="bg-gradient-to-r from-black via-purple-900 to-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 py-20">
        {/* Text Section */}
        <div className="space-y-7">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
            Dress sharp. Stay untouchable.
            <br />
            <span className="text-yellow-400">Redefine Your Style Today</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Shop the latest streetwear, urban fits, and premium comfortwear.
            Curated for those who want to make a statement with every step.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-4 px-6 py-3 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition"
          >
            Shop Now
          </Link>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg mx-auto p-4">
          {[
            "https://i.pinimg.com/736x/b4/25/6f/b4256fb3ecb15d2380d71ed2c0aa90b8.jpg",
            "https://i.pinimg.com/736x/07/5f/24/075f24f7d4b3ac0eede5a1eed06dc08b.jpg",
            "https://i.pinimg.com/736x/60/85/b7/6085b78e4a2426e927fc07e9e5ec1c08.jpg",
            "https://i.pinimg.com/736x/17/1f/21/171f21ba9fe36a8efcdc591b571c0e17.jpg",
          ].map((src, idx) => (
            <div
              key={idx}
              className="w-full aspect-square bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={src}
                alt={`Model ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl text-center">
        <h1 className="text-3xl font-bold text-center mb-12 relative inline-block">
          Trending Products
          <span className="absolute -bottom-2 left-0 right-0 mx-auto w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></span>
        </h1>

        {/* Search Bar */}
        <div className="flex items-center px-4 gap-2 mb-10 bg-slate-800 border-2 border-slate-700 text-white rounded-3xl max-w-md mx-auto">
          <Search />
          <input
            onChange={(event) => dispatch(search(event.target.value))}
            type="search"
            placeholder="Enter keyword to search"
            className="flex-1 h-10 px-2 bg-transparent text-lg focus:outline-none"
          />
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {loading ? (
            <div className="col-span-4 flex justify-center items-center py-10 mb-10">
              <svg
                className="w-16 h-16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 350 250"
              >
                <path
                  fill="none"
                  stroke="#FFD700"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="300 385"
                  strokeDashoffset="0"
                  d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    calcMode="spline"
                    dur="2s"
                    values="685;-685"
                    keySplines="0 0 1 1"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </div>
          ) : error.length > 0 ? (
            <h2 className="text-center text-amber-400">{error}</h2>
          ) : currentProducts.length > 0 ? (
            currentProducts.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950 border border-purple-800 text-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all duration-300 hover:border-yellow-500"
              >
                <div className="relative aspect-square overflow-hidden rounded-md mb-3">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
                <Link to={`/details/${item.id}`}>
                  <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                    {item.description || "Premium quality product with modern design"}
                  </p>
                  <p className="text-lg font-bold text-yellow-500 mb-3">
                    ₹{item.price}
                  </p>
                </Link>

                <div className="flex gap-2">
                  <button
                    className="bg-yellow-600 hover:bg-yellow-500 text-black text-sm px-2 py-1.5 rounded-full flex-1 transition"
                    onClick={() => dispatch(addToWishlist(item))}
                  >
                    Wishlist
                  </button>
                  <button
                    className="bg-yellow-600 hover:bg-yellow-500 text-black text-sm px-2 py-1.5 rounded-full flex-1 transition"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-4 text-gray-400">No products found</p>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex gap-6 justify-center mt-10 items-center mb-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-4 py-2 rounded-full ${
            currentPage === 1
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-400 text-black"
          }`}
        >
          <ArrowLeft size={18} /> Prev
        </button>
        <p>
          Page <span className="font-bold">{currentPage}</span> of{" "}
          <span className="font-bold">{totalPage}</span>
        </p>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPage}
          className={`flex items-center gap-1 px-4 py-2 rounded-full ${
            currentPage === totalPage
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-400 text-black"
          }`}
        >
          Next <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
