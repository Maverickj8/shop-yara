'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop&q=80"
              alt="Luxury Fragrances and Accessories"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              About Shop Yara
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Welcome to Shop Yara—your premier destination for luxury fragrances and premium accessories in Lagos, Nigeria.
              We curate signature scents, elegant gift-ready sets, and thoughtful add-ons that elevate your everyday and
              special occasions.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you love deep oud notes, soft florals, or warm vanilla layers, our collection helps you find the
              perfect fragrance match. Pair it with travel atomizers, storage trays, and luxury packaging accessories to
              complete your experience.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Shop Yara, we believe scent is confidence. Our mission is to deliver premium, authentic fragrance
              experiences with beautiful accessories—backed by quality, care, and fast service.
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gold transition-all duration-300 transform hover:scale-105"
            >
              Read More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
