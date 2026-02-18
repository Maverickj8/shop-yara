import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { ProductProvider } from '@/context/ProductContext'

export const metadata = {
  title: 'Shop Yara - Premium Beauty Essentials',
  description: 'Discover luxury cosmetics, fragrances, and personal care products curated just for you.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProductProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  )
}
