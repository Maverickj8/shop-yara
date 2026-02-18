'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useProducts } from '@/context/ProductContext'
import { useCart } from '@/context/CartContext'
import ProductImage from '@/components/ProductImage'

export default function ProductsPage() {
  const { visibleProducts, allowedCategories, selectedCategory, setSelectedCategory } = useProducts()
  const { addToCart } = useCart()

  useEffect(() => {
    // Ensure selection is valid (in case of old localStorage)
    if (selectedCategory && !allowedCategories.includes(selectedCategory)) {
      setSelectedCategory('')
    }
  }, [selectedCategory, allowedCategories, setSelectedCategory])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {selectedCategory ? selectedCategory : 'All Products'}
              </h1>
              <p className="mt-3 text-gray-600 max-w-2xl">
                Explore our curated selection of luxury fragrances and premium accessories.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-5 py-2 rounded-full font-semibold border transition-colors ${
                  selectedCategory === '' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-900 border-gray-300 hover:border-gray-900'
                }`}
              >
                All
              </button>
              {allowedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full font-semibold border transition-colors ${
                    selectedCategory === cat ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-900 border-gray-300 hover:border-gray-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-3">No products found</h2>
              <p className="text-gray-600 mb-6">
                Try switching categories or check back soon.
              </p>
              <button
                onClick={() => setSelectedCategory('')}
                className="px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gold transition-all duration-300"
              >
                View all products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {visibleProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.05 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="relative h-64 overflow-hidden">
                      <ProductImage
                        src={product.image}
                        alt={product.name}
                        gender={product.gender}
                        category={product.category}
                        className="w-full h-full transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cream text-gray-900">
                        {product.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        Stock: {product.quantity}
                      </span>
                    </div>

                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-gold transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-gray-900">
                        ₦{product.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gold transition-all duration-300"
                      >
                        Add to Cart
                      </button>
                      <Link
                        href={`/product/${product.id}`}
                        className="px-4 py-2 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

