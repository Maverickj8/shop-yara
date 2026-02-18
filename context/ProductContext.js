'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { initialProducts } from '@/data/products'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Load products from localStorage or use initial products
    const savedProducts = localStorage.getItem('shopYaraProducts')
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
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
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    }
    setProducts((prev) => [...prev, newProduct])
  }

  const updateProduct = (id, updatedProduct) => {
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

  return (
    <ProductContext.Provider
      value={{
        products,
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
