import { useLocation, useNavigate } from 'react-router-dom'
import Button from '@components/Button'
import { formatCurrency } from '@utils/formatCurrency'

export default function OrderConfirmation() {
  const navigate = useNavigate()
  const { state } = useLocation() as { state: any }

  if (!state) return (
    <div className="container mx-auto px-4 py-16 container-max">
      <div className="rounded-lg border border-primary bg-white p-8 text-center space-y-4">
        <div className="text-xl font-medium">No order found</div>
        <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-16 container-max">
      <div className="rounded-lg border border-primary bg-white p-8 text-center space-y-4">
        <div className="text-2xl font-semibold text-charcoal">Thank you! Your order has been placed.</div>
        <div className="text-sm text-charcoal">Order ID {state.orderId}</div>
        <div className="text-left space-y-3">
          <div className="font-medium">Order Summary</div>
          {state.items?.map((i: any) => (
            <div key={`${i.id}-${i.shade ?? ''}`} className="flex justify-between text-sm">
              <div>
                <div>{i.name}</div>
                {i.shade && <div className="text-charcoal">Shade: {i.shade}</div>}
                <div className="text-brand-600">Qty: {i.quantity}</div>
              </div>
              <div>{formatCurrency(i.price * i.quantity)}</div>
            </div>
          ))}
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(state.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery</span>
            <span>{state.deliveryType === 'male' ? formatCurrency(state.deliveryFee) : 'TBD via WhatsApp'}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{formatCurrency(state.total)}</span>
          </div>
          <div className="text-sm text-charcoal">Delivery: {state.deliveryType === 'male' ? "Male’ / Hulhumale’" : 'Island (Courier)'}</div>
          <div className="text-sm text-charcoal">Payment: {state.payment === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</div>
        </div>
        <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
      </div>
    </div>
  )
}
