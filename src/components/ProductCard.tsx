import { Link } from 'react-router-dom'
import type { Product } from '@data/products'
import Button from './Button'
import { useCart } from '@context/CartContext'
import { formatCurrency } from '@utils/formatCurrency'

type Props = { product: Product }

export default function ProductCard({ product }: Props) {
  const { addItem, toggle } = useCart()
  const label = product.isNew ? 'New' : product.isOnSale ? 'Sale' : product.isBestSeller ? 'Best Seller' : ''

  return (
    <div className="group rounded-lg border border-brand-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
          {label && <span className="absolute top-2 left-2 rounded-md bg-brand-500 px-2 py-1 text-xs text-white">{label}</span>}
        </div>
      </Link>
      <div className="p-4 space-y-2">
        <div className="text-sm text-brand-600">{product.brand}</div>
        <div className="font-medium text-brand-900">{product.name}</div>
        <div className="text-brand-700">{formatCurrency(product.price)}</div>
        <div className="flex gap-2">
          <Button onClick={() => { addItem(product, 1, product.shades?.[0]); toggle(true) }}>Add to Cart</Button>
          <Button variant="secondary" as-child={undefined}><Link to={`/product/${product.id}`}>View</Link></Button>
        </div>
      </div>
    </div>
  )
}
