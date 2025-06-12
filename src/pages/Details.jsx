import React, { useState, useEffect } from 'react'
import { ShoppingCart, Heart, Star, X, Shield, Truck, Eye } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ProductModal = ({ productData, onClose }) => {
  if (!productData) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Image Section */}
            <div className="relative group">
              <div className="aspect-square  bg-slate-950 border border-purple-800 rounded-xl overflow-hidden">
                <img
                  src={productData.thumbnail || '/placeholder-product.jpg'}
                  alt={productData.title || 'Product image'}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = '/placeholder-product.jpg'
                  }}
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6 via-purple-900 to-gray-900">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {productData.title || 'Untitled Product'}
                </h1>
                <div className="flex items-center mt-3 gap-4">
                  {productData.rating && (
                    <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm">{productData.rating}</span>
                    </div>
                  )}
                  {productData.availabilityStatus && (
                    <span className="text-green-400 text-sm font-medium px-3 py-1 bg-green-900/30 rounded-full">
                      {productData.availabilityStatus}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4  bg-slate-950 border border-purple-800 rounded-xl border border-gray-700">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-yellow-400">
                    ${productData.price?.toFixed(2) || '0.00'}
                  </span>
                  {productData.discountPercentage && (
                    <span className="text-sm line-through text-gray-400">
                      ${((productData.price || 0) / (1 - productData.discountPercentage / 100)).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {productData.description && (
                <p className="text-gray-300 leading-relaxed">
                  {productData.description}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-yellow-500/20">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="flex-1 border border-gray-700 bg-gray-800/50 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-gray-800/20">
                  <Heart size={20} className="fill-red-500 text-red-500" />
                  Wishlist
                </button>
              </div>

              {/* Product Details */}
              <div className="pt-6 space-y-4">
                {productData.shippingInformation && (
                  <div className="flex items-start gap-4 p-3 bg-gray-800/30 rounded-xl">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                      <Truck className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Shipping</h3>
                      <p className="text-yellow-400 text-sm mt-1">
                        {productData.shippingInformation}
                      </p>
                    </div>
                  </div>
                )}

                {(productData.warrantyInformation || productData.returnPolicy) && (
                  <div className="flex items-start gap-4 p-3 bg-gray-800/30 rounded-xl">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                      <Shield className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Warranty & Returns</h3>
                      <p className="text-yellow-400 text-sm mt-1">
                        {productData.warrantyInformation} 
                        {productData.warrantyInformation && productData.returnPolicy && ' • '}
                        {productData.returnPolicy}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

const Product = () => {
  const { products } = useSelector((state) => state.productSlice)
  const [productData, setProductData] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState(null)
  const { productId } = useParams()

  useEffect(() => {
    try {
      if (products && products.length > 0) {
        const productDetails = products.find(item => item.id === Number(productId))
        if (!productDetails) {
          setError('Product not found')
        }
        setProductData(productDetails)
      }
    } catch (err) {
      setError('Failed to load product details')
    }
  }, [products, productId])

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-900 text-white p-4">
        <div className="text-2xl font-bold text-red-400">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 via-purple-900 to-gray-900 text-white p-4">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
          <div className="text-lg">Loading product...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-4 flex flex-col items-center justify-center gap-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="relative bg-yellow-500 text-white px-8 py-4 rounded-xl hover:bg-yellow-200 transition-all duration-300 shadow-xl hover:shadow-blue-500/20 group"
      >
        <span className="relative z-10 flex items-center gap-2 text-black hover:text-white">
          <Eye className="w-5 h-5" />
          View Product Details
        </span>
        <span className="absolute inset-0  bg-slate-950 border border-purple-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>

      {isModalOpen && (
        <ProductModal 
          productData={productData} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  )
}

export default Product