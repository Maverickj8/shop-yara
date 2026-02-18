'use client'

import { motion } from 'framer-motion'
import { useProducts } from '@/context/ProductContext'

const services = [
  {
    id: 3,
    title: 'Luxury Fragrances',
    description: 'Exotic perfumes and body mists that leave a lasting impression.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop',
    category: 'Fragrance',
  },
  {
    id: 6,
    title: 'Accessories',
    description: 'Elegant add-ons for gifting, travel, and organizing your fragrance collection.',
    image: 'https://images.unsplash.com/photo-1585386959984-a41552231693?w=600&h=600&fit=crop',
    category: 'Accessories',
  },
]

export default function Services() {
  const { setSelectedCategory } = useProducts()

  const handleSelect = (category) => {
    setSelectedCategory(category)
    const el = document.getElementById('products')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore luxury fragrances and premium accessories curated for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleSelect(service.category)}
              className="text-left bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
                <span className="inline-block mt-4 text-gold font-semibold">
                  View {service.title} →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
