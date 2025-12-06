import { Link, useNavigate } from 'react-router-dom'
import ProductGrid from '@components/ProductGrid'
import Button from '@components/Button'
import { products } from '@data/products'

export default function Home() {
  const navigate = useNavigate()
  const featured = products.slice(0, 4)

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-100 to-brand-200">
        <div className="container mx-auto px-4 py-16 container-max grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-brand-900">Discover Your Everyday Glam</h1>
            <p className="text-brand-700">Modern, friendly makeup for every day. Shop best-sellers and new arrivals.</p>
            <Button onClick={() => navigate('/shop')}>Shop Now</Button>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md">
            <img src="https://via.placeholder.com/900x600.png?text=Beauty+Banner" alt="Banner" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section id="categories" className="container mx-auto px-4 py-12 container-max">
        <h2 className="text-xl font-semibold text-brand-900 mb-4">Featured Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['face','eyes','lips','skincare','tools'].map(c => (
            <Link key={c} to={`/shop?category=${c}`} className="rounded-lg bg-white border border-brand-100 p-4 text-center hover:shadow">
              <div className="capitalize font-medium text-brand-800">{c}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 container-max">
        <h2 className="text-xl font-semibold text-brand-900 mb-4">Featured Products</h2>
        <ProductGrid products={featured} />
      </section>
    </div>
  )
}
