'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useProducts } from '@/context/ProductContext'
import { useCart } from '@/context/CartContext'

export default function PopularProducts() {
  const { visibleProducts, selectedCategory, setSelectedCategory } = useProducts()
  const { addToCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    // Show a simple alert (you can replace this with a toast notification)
    alert(`${product.name} added to cart!`)
  }

  const shownProducts = visibleProducts.slice(0, 8)

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {selectedCategory ? `${selectedCategory} Products` : 'Popular Products'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover luxury fragrances and premium accessories
          </p>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory('')}
                className="px-5 py-2 bg-gray-100 text-gray-800 rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                Clear filter
              </button>
            )}
            <Link
              href="/products"
              className="px-5 py-2 bg-gray-900 text-white rounded-full font-semibold hover:bg-gold transition-all duration-300"
            >
              See All Products →
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {shownProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href={`/product/${product.id}`}>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </Link>
              <div className="p-6">
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
                    onClick={() => handleAddToCart(product)}
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

        {shownProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No products found in this category yet.
            </p>
            <div className="mt-4">
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gold transition-all duration-300"
              >
                Browse all products
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
