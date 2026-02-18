'use client'

import { motion } from 'framer-motion'

const services = [
  {
    id: 1,
    title: 'Skincare Products',
    description: 'Premium serums, cleansers, and moisturizers for radiant, healthy skin.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'Makeup Essentials',
    description: 'High-quality foundations, lipsticks, and eye makeup for flawless looks.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop',
  },
  {
    id: 3,
    title: 'Luxury Fragrances',
    description: 'Exotic perfumes and body mists that leave a lasting impression.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop',
  },
  {
    id: 4,
    title: 'Body Care',
    description: 'Nourishing body butters, scrubs, and lotions for silky smooth skin.',
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&h=600&fit=crop',
  },
  {
    id: 5,
    title: 'Hair Care',
    description: 'Natural oils and treatments for strong, healthy, and beautiful hair.',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
  },
  {
    id: 6,
    title: 'Beauty Accessories',
    description: 'Essential tools and accessories to complete your beauty collection.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop',
  },
]

export default function Services() {
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
            Our Beauty Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated selection of premium beauty products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
