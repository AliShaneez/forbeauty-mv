/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D58EA3',
        secondary: '#C05D7C',
        ivory: '#F3E8EC',
        charcoal: '#1C1C1C',
        accent: '#C9AD5E'
      }
    }
  },
  plugins: []
}
