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
import { ProductsProvider } from '@context/ProductsContext'
import AdminLogin from '@pages/AdminLogin'
import AdminDashboard from '@pages/AdminDashboard'
import { AdminProvider, RequireAdmin } from '@context/AdminContext'

export default function App() {
  return (
    <AdminProvider>
      <ProductsProvider>
        <CartProvider>
          <div className="min-h-full flex flex-col bg-ivory">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <CartDrawer />
          </div>
        </CartProvider>
      </ProductsProvider>
    </AdminProvider>
  )
}
