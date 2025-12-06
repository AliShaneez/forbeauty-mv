import { useNavigate } from 'react-router-dom'
import { useCart } from '@context/CartContext'
import Button from './Button'
import { formatCurrency } from '@utils/formatCurrency'

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, isOpen, toggle, subtotal } = useCart()
  const navigate = useNavigate()

  const goCheckout = () => {
    toggle(false)
    navigate('/checkout')
  }

  return (
    <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-40`}>
      <div className="flex h-16 items-center justify-between border-b border-brand-100 px-4">
        <div className="font-medium">Your Cart</div>
        <button className="text-brand-700 hover:text-brand-900" onClick={() => toggle(false)}>Close</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {items.length === 0 && <div className="text-sm text-brand-600">Your cart is empty.</div>}
        {items.map(i => (
          <div key={`${i.product.id}-${i.shade ?? ''}`} className="flex gap-3 border border-brand-100 rounded-lg p-3">
            <img src={i.product.imageUrl} alt={i.product.name} className="h-16 w-16 object-cover rounded" />
            <div className="flex-1">
              <div className="text-sm text-brand-600">{i.product.brand}</div>
              <div className="font-medium">{i.product.name}</div>
              {i.shade && <div className="text-xs text-brand-600">Shade: {i.shade}</div>}
              <div className="mt-1 text-brand-800">{formatCurrency(i.product.price)}</div>
              <div className="mt-2 flex items-center gap-2">
                <button className="rounded-md border px-2" onClick={() => updateQuantity(i.product.id, Math.max(1, i.quantity - 1), i.shade)}>-</button>
                <span className="text-sm">{i.quantity}</span>
                <button className="rounded-md border px-2" onClick={() => updateQuantity(i.product.id, i.quantity + 1, i.shade)}>+</button>
                <button className="ml-auto text-sm text-red-600" onClick={() => removeItem(i.product.id, i.shade)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-brand-100 p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <Button className="w-full" onClick={goCheckout} disabled={items.length === 0}>Proceed to Checkout</Button>
      </div>
    </div>
  )
}
