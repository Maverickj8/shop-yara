/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F5DC',
        blush: '#FFE4E1',
        gold: '#D4AF37',
      },
    },
  },
  plugins: [],
}
