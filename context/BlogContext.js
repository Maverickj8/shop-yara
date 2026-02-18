'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const BlogContext = createContext()

const initialArticles = [
  {
    id: '1',
    title: 'How to Choose Your Signature Scent',
    excerpt: 'A simple guide to fragrance families—find the notes that match your mood, style, and lifestyle.',
    content: 'Finding your signature scent is a personal journey. Start by understanding fragrance families: floral, oriental, woody, fresh, and fougère. Visit our store to sample different scents and see how they evolve on your skin throughout the day.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=600&fit=crop',
    date: 'March 15, 2024',
    author: 'Shop Yara Team',
  },
  {
    id: '2',
    title: 'Layering 101: Make Your Perfume Last Longer',
    excerpt: 'Learn smart layering tips with mists and eau de parfum for longer wear and better projection.',
    content: 'Layering fragrances is an art. Start with a scented body mist as your base, then apply your eau de parfum to pulse points. Use matching scented lotions or body oils to create a lasting fragrance experience that evolves beautifully throughout the day.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=600&fit=crop',
    date: 'March 10, 2024',
    author: 'Shop Yara Team',
  },
  {
    id: '3',
    title: 'Fragrance Accessories You Actually Need',
    excerpt: 'From travel atomizers to storage trays—upgrade your fragrance routine with elegant essentials.',
    content: 'Elevate your fragrance collection with essential accessories. Travel atomizers let you take your favorite scents anywhere. Storage trays keep your bottles organized and displayed beautifully. Gift boxes make every purchase special. These thoughtful additions enhance your fragrance experience.',
    image: 'https://images.unsplash.com/photo-1585386959984-a41552231693?w=800&h=600&fit=crop',
    date: 'March 5, 2024',
    author: 'Shop Yara Team',
  },
]

export function BlogProvider({ children }) {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    // Load articles from localStorage or use initial articles
    const savedArticles = localStorage.getItem('shopYaraArticles')
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles))
    } else {
      setArticles(initialArticles)
      localStorage.setItem('shopYaraArticles', JSON.stringify(initialArticles))
    }
  }, [])

  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem('shopYaraArticles', JSON.stringify(articles))
    }
  }, [articles])

  const addArticle = (article) => {
    const newArticle = {
      ...article,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    }
    setArticles((prev) => [newArticle, ...prev])
  }

  const updateArticle = (id, updatedArticle) => {
    setArticles((prev) =>
      prev.map((article) => (article.id === id ? { ...article, ...updatedArticle } : article))
    )
  }

  const deleteArticle = (id) => {
    setArticles((prev) => prev.filter((article) => article.id !== id))
  }

  const getArticleById = (id) => {
    return articles.find((article) => article.id === id)
  }

  return (
    <BlogContext.Provider
      value={{
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        getArticleById,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider')
  }
  return context
}
