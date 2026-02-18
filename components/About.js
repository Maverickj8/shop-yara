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
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&fit=crop"
              alt="Beauty Products"
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
              Welcome to Shop Yara, your premier destination for beauty, cosmetics, and personal care products. 
              We are passionate about helping you look and feel your absolute best. Our carefully curated collection 
              features premium skincare essentials, luxurious fragrances, high-quality makeup products, and nourishing 
              body care items.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With years of expertise in the beauty industry, we understand that every individual has unique needs. 
              That's why we offer a diverse range of products suitable for all skin types and preferences. From 
              anti-aging serums to long-lasting perfumes, from matte foundations to hydrating body butters, 
              we have everything you need to create your perfect beauty routine.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Shop Yara, we believe that beauty is not just about appearance—it's about confidence, self-care, 
              and feeling amazing in your own skin. Our mission is to provide you with products that enhance your 
              natural beauty while maintaining the highest standards of quality and affordability.
            </p>
            <Link
              href="#products"
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
