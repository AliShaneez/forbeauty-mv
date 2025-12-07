import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@context/CartContext'
import Input from '@components/Input'
import Select from '@components/Select'
import Button from '@components/Button'
import { formatCurrency } from '@utils/formatCurrency'

export default function Checkout() {
  const { items, subtotal, clear } = useCart()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const [deliveryType, setDeliveryType] = useState('male')
  const [house, setHouse] = useState('')
  const [street, setStreet] = useState('')
  const [island, setIsland] = useState('')
  const [note, setNote] = useState('')

  const [payment, setPayment] = useState('cod')

  const deliveryFee = deliveryType === 'male' ? 30 : 0
  const total = subtotal + deliveryFee

  const orderSummary = useMemo(() => items.map(i => ({ id: i.product.id, name: i.product.name, shade: i.shade, quantity: i.quantity, price: i.product.price })), [items])

  const placeOrder = () => {
    const orderId = 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase()
    const data = {
      orderId,
      items: orderSummary,
      subtotal,
      deliveryFee,
      total,
      deliveryType,
      payment,
      customer: { fullName, phone, email },
      address: { house, street, island, note }
    }
    clear()
    navigate('/order-confirmation', { state: data, replace: true })
  }

  return (
    <div className="container mx-auto px-4 py-8 container-max">
      <h1 className="text-2xl font-semibold text-charcoal mb-6">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-medium text-charcoal">Customer Info</h2>
            <Input placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
            <Input placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
            <Input placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-medium text-charcoal">Delivery / Shipping Info</h2>
            <Select value={deliveryType} onChange={e => setDeliveryType(e.target.value)}>
              <option value="male">Male’ / Hulhumale’ Delivery</option>
              <option value="island">Island Delivery (Courier)</option>
            </Select>
            <Input placeholder="House / Building" value={house} onChange={e => setHouse(e.target.value)} />
            <Input placeholder="Street" value={street} onChange={e => setStreet(e.target.value)} />
            <Input placeholder="Island / Atoll" value={island} onChange={e => setIsland(e.target.value)} />
            <textarea className="w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300" placeholder="Delivery Note (optional)" value={note} onChange={e => setNote(e.target.value)} />
            {deliveryType === 'male' ? (
              <div className="text-sm text-charcoal">Fixed delivery fee {formatCurrency(deliveryFee)} applies.</div>
            ) : (
              <div className="text-sm text-charcoal">Courier charges will be confirmed via WhatsApp after order.</div>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-medium text-charcoal">Billing & Payment</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" checked={payment === 'cod'} onChange={() => setPayment('cod')} />
                <span>Cash on Delivery (COD)</span>
              </label>
              <div className="text-sm text-charcoal">Please keep the exact amount ready on delivery</div>
              <label className="flex items-center gap-2 mt-2">
                <input type="radio" checked={payment === 'bank'} onChange={() => setPayment('bank')} />
                <span>Bank Transfer</span>
              </label>
              {payment === 'bank' && (
                <div className="rounded-md border border-primary p-3 text-sm">
                  <div>Bank: Bank of Maldives</div>
                  <div>Account Name: ForBeauty.mv</div>
                  <div>Account No: 777777777777</div>
                </div>
              )}
              <label className="flex items-center gap-2 mt-2 opacity-60">
                <input type="radio" disabled />
                <span>Card Payment – Coming Soon</span>
              </label>
            </div>
          </div>
        </div>
          <div>
          <div className="rounded-lg border border-primary bg-white p-4 space-y-3">
            <h2 className="text-lg font-medium text-charcoal">Order Summary</h2>
            <div className="space-y-2 text-sm">
              {items.map(i => (
                <div key={`${i.product.id}-${i.shade ?? ''}`} className="flex justify-between">
                  <div>
                    <div>{i.product.name}</div>
                    {i.shade && <div className="text-charcoal">Shade: {i.shade}</div>}
                    <div className="text-charcoal">Qty: {i.quantity}</div>
                </div>
                <div>{formatCurrency(i.product.price * i.quantity)}</div>
              </div>
            ))}
          </div>
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery</span>
              <span>{deliveryType === 'male' ? formatCurrency(deliveryFee) : 'TBD via WhatsApp'}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <Button className="w-full" onClick={placeOrder} disabled={items.length === 0}>Place Order</Button>
          </div>
          <a className="mt-3 inline-block text-sm text-charcoal" href={`https://wa.me/9607000000?text=${encodeURIComponent('Hello, I would like to confirm delivery charges for my order.')}`} target="_blank" rel="noopener noreferrer">Contact via WhatsApp</a>
        </div>
      </div>
    </div>
  )
}
