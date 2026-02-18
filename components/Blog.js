'use client'

import { motion } from 'framer-motion'

const blogPosts = [
  {
    id: 1,
    title: 'How to Choose Your Signature Scent',
    excerpt: 'A simple guide to fragrance families—find the notes that match your mood, style, and lifestyle.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=600&fit=crop',
    date: 'March 15, 2024',
  },
  {
    id: 2,
    title: 'Layering 101: Make Your Perfume Last Longer',
    excerpt: 'Learn smart layering tips with mists and eau de parfum for longer wear and better projection.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=600&fit=crop',
    date: 'March 10, 2024',
  },
  {
    id: 3,
    title: 'Fragrance Accessories You Actually Need',
    excerpt: 'From travel atomizers to storage trays—upgrade your fragrance routine with elegant essentials.',
    image: 'https://images.unsplash.com/photo-1585386959984-a41552231693?w=800&h=600&fit=crop',
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
            Fragrance Blog
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tips, trends, and guides for fragrances and accessories
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
