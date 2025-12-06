import { Link } from 'react-router-dom'
import ProductGrid from '@components/ProductGrid'
import { products } from '@data/products'

export default function Home() {
  const featured = products.slice(0, 4)

  return (
    <div>
      

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
