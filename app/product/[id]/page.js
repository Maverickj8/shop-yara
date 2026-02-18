'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { useProducts } from '@/context/ProductContext'
import { useCart } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductImage from '@/components/ProductImage'
import { motion } from 'framer-motion'

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const { getProductById, products } = useProducts()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = getProductById(params.id)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/" className="text-gold hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    alert(`${product.name} added to cart!`)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    router.push('/checkout')
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)
  
  // If not enough same category products, fill with other products
  if (relatedProducts.length < 4) {
    const otherProducts = products
      .filter((p) => p.id !== product.id && !relatedProducts.find((rp) => rp.id === p.id))
      .slice(0, 4 - relatedProducts.length)
    relatedProducts.push(...otherProducts)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/" className="text-gray-600 hover:text-gold">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="#products" className="text-gray-600 hover:text-gold">
              Products
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  gender={product.gender}
                  category={product.category}
                  className="w-full h-full"
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-gray-900">
                ₦{product.price.toLocaleString()}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-semibold">Quantity:</label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x-2 border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-600">
                  ({product.quantity} available)
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gold transition-all duration-300 transform hover:scale-105"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 px-8 py-4 bg-gold text-gray-900 rounded-lg font-semibold hover:bg-gold/90 transition-all duration-300 transform hover:scale-105"
                >
                  Buy Now
                </button>
              </div>

              {/* Specifications */}
              <div className="border-t pt-6">
                <h3 className="text-xl font-bold mb-4">Specifications</h3>
                <div className="space-y-2">
                  {Object.entries(product.specifications || {}).map(([key, value]) => (
                    <div key={key} className="flex">
                      <span className="font-semibold text-gray-700 w-32 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Customer Reviews */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
            <div className="space-y-6">
              {[
                {
                  name: 'Sarah Johnson',
                  rating: 5,
                  comment: 'Absolutely love this product! It has transformed my skincare routine.',
                  date: '2 weeks ago',
                },
                {
                  name: 'Maryam Adebayo',
                  rating: 5,
                  comment: 'High quality and great value for money. Highly recommended!',
                  date: '1 month ago',
                },
                {
                  name: 'Chioma Okeke',
                  rating: 4,
                  comment: 'Good product, fast delivery. Will order again.',
                  date: '2 months ago',
                },
              ].map((review, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating ? 'text-gold' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{review.comment}</p>
                  <span className="text-sm text-gray-400">{review.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.slice(0, 4).map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/product/${relatedProduct.id}`}
                    className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <ProductImage
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        gender={relatedProduct.gender}
                        category={relatedProduct.category}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-gray-900">
                        ₦{relatedProduct.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
