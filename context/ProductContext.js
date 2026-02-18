'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { initialProducts } from '@/data/products'

const ProductContext = createContext()
const ALLOWED_CATEGORIES = ['Fragrance', 'Accessories']

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('') // '' = all

  useEffect(() => {
    // Load products from localStorage or use initial products
    const savedProducts = localStorage.getItem('shopYaraProducts')
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts)
      const normalized = Array.isArray(parsed)
        ? parsed.filter((p) => ALLOWED_CATEGORIES.includes(p.category))
        : []

      if (normalized.length > 0) {
        setProducts(normalized)
      } else {
        setProducts(initialProducts)
        localStorage.setItem('shopYaraProducts', JSON.stringify(initialProducts))
      }
    } else {
      setProducts(initialProducts)
      localStorage.setItem('shopYaraProducts', JSON.stringify(initialProducts))
    }
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('shopYaraProducts', JSON.stringify(products))
    }
  }, [products])

  const addProduct = (product) => {
    if (!ALLOWED_CATEGORIES.includes(product.category)) {
      throw new Error('Invalid category')
    }
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    }
    setProducts((prev) => [...prev, newProduct])
  }

  const updateProduct = (id, updatedProduct) => {
    if (updatedProduct.category && !ALLOWED_CATEGORIES.includes(updatedProduct.category)) {
      throw new Error('Invalid category')
    }
    setProducts((prev) =>
      prev.map((product) => (product.id === id ? { ...product, ...updatedProduct } : product))
    )
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id))
  }

  const getProductById = (id) => {
    return products.find((product) => product.id === id)
  }

  const visibleProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products

  return (
    <ProductContext.Provider
      value={{
        products,
        visibleProducts,
        allowedCategories: ALLOWED_CATEGORIES,
        selectedCategory,
        setSelectedCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
}
