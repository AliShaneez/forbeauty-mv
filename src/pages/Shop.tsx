import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '@data/products'
import ProductGrid from '@components/ProductGrid'
import Input from '@components/Input'
import Select from '@components/Select'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('')
  const category = params.get('category') ?? ''

  const filtered = useMemo(() => {
    let list = products
    if (category) list = list.filter(p => p.category === category)
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
    }
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'new') list = [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    return list
  }, [category, query, sort])

  return (
    <div className="container mx-auto px-4 py-8 container-max">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <Select value={category} onChange={e => { params.set('category', e.target.value); setParams(params, { replace: true }) }}>
            <option value="">All Categories</option>
            <option value="face">Face</option>
            <option value="eyes">Eyes</option>
            <option value="lips">Lips</option>
            <option value="skincare">Skincare</option>
            <option value="tools">Tools</option>
          </Select>
          <Select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="price-asc">Price: Low–High</option>
            <option value="price-desc">Price: High–Low</option>
            <option value="new">New In</option>
          </Select>
        </div>
        <div className="md:w-80">
          <Input placeholder="Search products" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>
      <ProductGrid products={filtered} />
    </div>
  )
}
