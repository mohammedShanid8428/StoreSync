import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromWishlist } from '../redux/slices/wishSlice'
import { addToCart } from '../redux/slices/cartSlice'
import { Trash2, ShoppingCart, Heart } from 'lucide-react'

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishSlice)
  const dispatch = useDispatch()

  return (
    <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white min-h-screen py-16">
      <div className="max-w-7xl text-center">
        <h1 className="text-4xl font-bold text-center mb-12 relative inline-block">
          Your Wishlist
          <span className="absolute -bottom-2 left-0 right-0 mx-auto w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="group relative bg-slate-950 border border-purple-800 rounded-2xl p-5 shadow-2xl hover:shadow-gray-800/30 transition-all duration-300 border border-gray-800 overflow-hidden"
              >
                {/* Product Image with hover effect */}
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-60 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Quick view overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white/90 text-black px-4 py-2 rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="relative z-10">
                  <h2 className="text-lg font-bold text-white line-clamp-1">{item.title}</h2>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xl font-semibold text-yellow-400">${item.price}</p>
                  </div>
                </div>

                {/* Action Buttons - Slide up on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 space-y-3">
                  <button
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="w-full bg-red-600/90 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-600/20"
                  >
                    <Trash2 className="w-5 h-5" />
                    Remove
                  </button>
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-yellow-500/20"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>

                {/* Floating like button */}
                <button
                  className="absolute top-4 right-4 bg-gray-800/80 hover:bg-red-600 backdrop-blur-sm p-2 rounded-full transition-colors duration-200 z-20"
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                >
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-gray-400">Your wishlist is empty</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Wishlist