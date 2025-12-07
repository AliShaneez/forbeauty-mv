import { useParams, useNavigate } from 'react-router-dom'
import { useProducts } from '@context/ProductsContext'
import Button from '@components/Button'
import Select from '@components/Select'
import { useCart } from '@context/CartContext'
import { useMemo, useState } from 'react'
import { formatCurrency } from '@utils/formatCurrency'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products } = useProducts()
  const product = products.find(p => p.id === id)
  const { addItem, toggle } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [shade, setShade] = useState(product?.shades?.[0])

  if (!product) return <div className="container mx-auto px-4 py-8 container-max">Product not found.</div>

  const related = useMemo(() => products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4), [product])

  return (
    <div className="container mx-auto px-4 py-8 container-max">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg border border-primary object-cover" />
        </div>
        <div className="space-y-4">
          <div className="text-sm text-charcoal">{product.brand}</div>
          <h1 className="text-2xl font-semibold text-charcoal">{product.name}</h1>
          <div className="text-charcoal">{formatCurrency(product.price)}</div>
          <p className="text-charcoal">{product.description}</p>
          {product.shades && (
            <div className="space-y-2">
              <div className="text-sm">Shade</div>
              <Select value={shade} onChange={e => setShade(e.target.value)}>
                {product.shades.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
            </div>
          )}
          <div className="flex items-center gap-2">
            <button className="rounded-md border px-2" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span className="text-sm">{quantity}</span>
            <button className="rounded-md border px-2" onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => { addItem(product, quantity, shade); toggle(true) }}>Add to Cart</Button>
            <Button variant="secondary" onClick={() => navigate('/checkout')}>Buy Now</Button>
          </div>
          <a className="inline-block text-sm text-brand-700" href={`https://wa.me/9607000000?text=${encodeURIComponent('Hello, I have a question about ' + product.name)}`} target="_blank" rel="noopener noreferrer">Contact via WhatsApp</a>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-charcoal mb-4">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map(r => (
            <div key={r.id} className="rounded-lg border border-primary p-3">
              <img src={r.imageUrl} alt={r.name} className="w-full h-32 object-cover rounded" />
              <div className="mt-2 text-sm text-charcoal">{r.brand}</div>
              <div className="font-medium">{r.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
