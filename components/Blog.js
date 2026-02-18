'use client'

import { motion } from 'framer-motion'

const blogPosts = [
  {
    id: 1,
    title: '10 Skincare Tips for Glowing Skin',
    excerpt: 'Discover expert tips and tricks to achieve radiant, healthy skin that glows from within.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop',
    date: 'March 15, 2024',
  },
  {
    id: 2,
    title: 'How to Choose the Perfect Perfume',
    excerpt: 'Learn how to select fragrances that complement your personality and last all day long.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=600&fit=crop',
    date: 'March 10, 2024',
  },
  {
    id: 3,
    title: 'Makeup Trends for 2024',
    excerpt: 'Stay ahead of the curve with the latest makeup trends and techniques for this year.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop',
    date: 'March 5, 2024',
  },
]

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Beauty Blog
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest beauty tips and trends
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <span className="text-sm text-gray-500">{post.date}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <button className="text-gold font-semibold hover:underline">
                  View Full Article →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
