import { useState } from 'react'
import { useProducts } from '@context/ProductsContext'
import Button from '@components/Button'
import Input from '@components/Input'
import Select from '@components/Select'
import { useAdmin } from '@context/AdminContext'

export default function AdminDashboard() {
  const { products, addProduct, updateProduct, deleteProduct, categories } = useProducts()
  const { signOut } = useAdmin()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filter, setFilter] = useState('')

  const [form, setForm] = useState({
    name: '',
    brand: '',
    category: categories[0],
    price: 0,
    imageUrl: '',
    isNew: false,
    isOnSale: false,
    isBestSeller: false,
    shades: ''
  })

  const startEdit = (id: string) => {
    const p = products.find(x => x.id === id)
    if (!p) return
    setEditingId(id)
    setForm({
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      imageUrl: p.imageUrl,
      isNew: !!p.isNew,
      isOnSale: !!p.isOnSale,
      isBestSeller: !!p.isBestSeller,
      shades: (p.shades ?? []).join(', ')
    })
  }

  const resetForm = () => {
    setEditingId(null)
    setForm({ name: '', brand: '', category: categories[0], price: 0, imageUrl: '', isNew: false, isOnSale: false, isBestSeller: false, shades: '' })
  }

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    const shadesArr = form.shades.split(',').map(s => s.trim()).filter(Boolean)
    if (editingId) {
      updateProduct(editingId, {
        name: form.name,
        brand: form.brand,
        category: form.category as any,
        price: Number(form.price),
        imageUrl: form.imageUrl,
        isNew: form.isNew || undefined,
        isOnSale: form.isOnSale || undefined,
        isBestSeller: form.isBestSeller || undefined,
        shades: shadesArr.length ? shadesArr : undefined
      })
    } else {
      addProduct({
        name: form.name,
        brand: form.brand,
        category: form.category as any,
        price: Number(form.price),
        imageUrl: form.imageUrl,
        isNew: form.isNew || undefined,
        isOnSale: form.isOnSale || undefined,
        isBestSeller: form.isBestSeller || undefined,
        shades: shadesArr.length ? shadesArr : undefined,
        description: ''
      })
    }
    resetForm()
  }

  const filtered = products.filter(p => !filter || p.category === filter)

  return (
    <div className="container mx-auto px-4 py-8 container-max">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <Button variant="secondary" onClick={signOut}>Logout</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Select value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </Select>
          </div>
          <div className="space-y-3">
            {filtered.map(p => (
              <div key={p.id} className="rounded-lg border border-brand-100 bg-white p-3 flex gap-3">
                <img src={p.imageUrl} alt={p.name} className="h-16 w-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="text-sm text-brand-600">{p.brand}</div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm">{p.category} • MVR {p.price.toFixed(2)}</div>
                  <div className="text-xs text-brand-600">{p.shades?.join(', ')}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" onClick={() => startEdit(p.id)}>Edit</Button>
                  <Button variant="ghost" onClick={() => deleteProduct(p.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="rounded-lg border border-brand-100 bg-white p-4">
            <h2 className="text-lg font-medium mb-3">{editingId ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={submitForm} className="space-y-2">
              <Input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Brand" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
              <Select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as any })}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </Select>
              <Input type="number" step="0.01" placeholder="Price (MVR)" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
              <Input placeholder="Image URL" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
              <Input placeholder="Shades (comma separated)" value={form.shades} onChange={e => setForm({ ...form, shades: e.target.value })} />
              <div className="flex items-center gap-3 text-sm">
                <label className="flex items-center gap-1"><input type="checkbox" checked={form.isNew} onChange={e => setForm({ ...form, isNew: e.target.checked })} />New</label>
                <label className="flex items-center gap-1"><input type="checkbox" checked={form.isOnSale} onChange={e => setForm({ ...form, isOnSale: e.target.checked })} />Sale</label>
                <label className="flex items-center gap-1"><input type="checkbox" checked={form.isBestSeller} onChange={e => setForm({ ...form, isBestSeller: e.target.checked })} />Best Seller</label>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">{editingId ? 'Save' : 'Add'}</Button>
                {editingId && <Button type="button" variant="secondary" onClick={resetForm}>Cancel</Button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
