/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff5f7',
          100: '#ffe4ea',
          200: '#fecbd6',
          300: '#f9a1b6',
          400: '#f2739a',
          500: '#e94a82',
          600: '#d0306c',
          700: '#aa2557',
          800: '#851d45',
          900: '#621533'
        }
      }
    }
  },
  plugins: []
}
