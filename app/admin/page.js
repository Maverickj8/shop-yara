'use client'

import { useState, useEffect } from 'react'
import { useProducts } from '@/context/ProductContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

const ADMIN_PASSWORD = 'admin123' // Simple password protection

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct, allowedCategories } = useProducts()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: '',
    category: 'Fragrance',
    specifications: '',
  })
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem('adminAuth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
    } else {
      alert('Incorrect password!')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuth')
    setPassword('')
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setFormData({
          ...formData,
          image: base64String,
        })
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate image
    if (!formData.image && !imagePreview) {
      alert('Please upload an image or provide an image URL')
      return
    }

    // Validate category
    if (!allowedCategories.includes(formData.category)) {
      alert('Please select a valid category')
      return
    }
    
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      image: formData.image || imagePreview || 'https://via.placeholder.com/800',
      category: formData.category,
      specifications: formData.specifications
        ? JSON.parse(formData.specifications)
        : {},
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productData)
      setEditingProduct(null)
    } else {
      addProduct(productData)
    }

    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      quantity: '',
      image: '',
      category: 'Fragrance',
      specifications: '',
    })
    setImagePreview('')
    setShowAddForm(false)
    alert(editingProduct ? 'Product updated!' : 'Product added!')
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      image: product.image,
      category: allowedCategories.includes(product.category) ? product.category : 'Fragrance',
      specifications: JSON.stringify(product.specifications || {}, null, 2),
    })
    setImagePreview(product.image)
    setShowAddForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id)
      alert('Product deleted!')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-gray-200 rounded-lg p-8 max-w-md w-full"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gold transition-all duration-300"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300"
            >
              Logout
            </button>
          </div>

          {/* Add/Edit Product Form */}
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold bg-white"
                    >
                      {allowedCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Price (₦) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
                {/* Image Upload Section */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Product Image *
                  </label>
                  <div className="space-y-4">
                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Upload Image (Max 5MB)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gold file:cursor-pointer"
                      />
                    </div>
                    {/* Or Image URL */}
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Or Enter Image URL
                      </label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={(e) => {
                          handleInputChange(e)
                          if (e.target.value) {
                            setImagePreview(e.target.value)
                          }
                        }}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                      />
                    </div>
                    {/* Image Preview */}
                    {(imagePreview || formData.image) && (
                      <div className="mt-4">
                        <label className="block text-sm text-gray-600 mb-2">
                          Preview
                        </label>
                        <div className="relative w-full max-w-md h-64 border-2 border-gray-300 rounded-lg overflow-hidden">
                          <img
                            src={imagePreview || formData.image}
                            alt="Product preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/800?text=Invalid+Image'
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, image: '' })
                            setImagePreview('')
                          }}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          Remove Image
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Specifications (JSON format)
                  </label>
                  <textarea
                    name="specifications"
                    value={formData.specifications}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold font-mono text-sm"
                    placeholder='{"size": "30ml", "ingredients": "..."}'
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gold transition-all duration-300"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false)
                      setEditingProduct(null)
                      setFormData({
                        name: '',
                        description: '',
                        price: '',
                        quantity: '',
                        image: '',
                        category: 'Fragrance',
                        specifications: '',
                      })
                      setImagePreview('')
                    }}
                    className="px-8 py-3 bg-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-400 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Add Product Button */}
          {!showAddForm && (
            <button
              onClick={() => {
                setEditingProduct(null)
                setFormData({
                  name: '',
                  description: '',
                  price: '',
                  quantity: '',
                  image: '',
                  category: 'Fragrance',
                  specifications: '',
                })
                setImagePreview('')
                setShowAddForm(true)
              }}
              className="mb-8 px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gold transition-all duration-300"
            >
              + Add New Product
            </button>
          )}

          {/* Products Table */}
          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Image</th>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Category</th>
                    <th className="px-6 py-4 text-left">Price</th>
                    <th className="px-6 py-4 text-left">Quantity</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold">{product.name}</td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">₦{product.price.toLocaleString()}</td>
                      <td className="px-6 py-4">{product.quantity}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
