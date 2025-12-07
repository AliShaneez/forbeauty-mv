/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F7C9D4',
        secondary: '#E8A2B8',
        ivory: '#FFF7F9',
        charcoal: '#2C2C2C',
        accent: '#E3C785'
      }
    }
  },
  plugins: []
}
