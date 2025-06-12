import React from "react";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity, decrementQuantity, removefromCart } from "../redux/slices/cartSlice";

export default function Cart() {
  const { cart } = useSelector(state => state.cartSlice);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white px-4 sm:px-6 py-12">
      <div className="max-w-7xl text-center">
        <h1 className="text-4xl font-bold text-center mb-12 relative inline-block">
          Your Cart
          <span className="absolute -bottom-2 left-0 right-0 mx-auto w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {cart.length > 0 ? (
            <>
              <div className="lg:col-span-2 space-y-6">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-6  bg-slate-950 border border-purple-800 backdrop-blur-sm p-5 rounded-xl  hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10"
                  >
                    <div className="relative">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                        {item.quantity}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-lg font-bold">{item.title}</h2>
                          <p className="text-sm text-gray-300">{item.brand}</p>
                        </div>
                        <p className="text-yellow-400 font-medium">${item.price}</p>
                      </div>

                      <div className="flex items-center mt-4 space-x-3">
                        <button
                          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all active:scale-95"
                          onClick={() => dispatch(decrementQuantity(item.id))}
                        >
                          <span className="text-lg">−</span>
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all active:scale-95"
                          onClick={() => dispatch(incrementQuantity(item.id))}
                        >
                          <span className="text-lg">+</span>
                        </button>
                      </div>
                    </div>

                    <button
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => dispatch(removefromCart(item.id))}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className=" bg-slate-950 border border-purple-800 backdrop-blur-sm p-6 rounded-xl h-fit sticky top-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Subtotal</span>
                    <span>${cart.reduce((prev, item) => prev + (item.quantity * item.price), 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Shipping</span>
                    <span className="text-green-400">FREE</span>
                  </div>
                </div>

                <div className="py-4 border-t border-b border-gray-700 my-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-yellow-400">
                      ${cart.reduce((prev, item) => prev + (item.quantity * item.price), 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 active:scale-95 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Proceed to Checkout
                </button>

                <div className="flex items-center mt-4 text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Order will be processed in 24 hours
                </div>
              </div>
            </>
          ) : (
            <div className="lg:col-span-3 text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-32 h-32 mx-auto mb-6 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-gray-400 mb-6">Looks like you haven't added anything to your cart yet</p>
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-medium hover:shadow-lg transition-all">
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}