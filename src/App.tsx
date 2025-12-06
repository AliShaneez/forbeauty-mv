import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import Home from '@pages/Home'
import Shop from '@pages/Shop'
import ProductDetails from '@pages/ProductDetails'
import Checkout from '@pages/Checkout'
import OrderConfirmation from '@pages/OrderConfirmation'
import CartDrawer from '@components/CartDrawer'
import { CartProvider } from '@context/CartContext'

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-full flex flex-col bg-brand-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  )
}
