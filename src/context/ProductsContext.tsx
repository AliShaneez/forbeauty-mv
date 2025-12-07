import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products as seedProducts, type Product, type Category } from '@data/products'

type ProductsContextType = {
  products: Product[]
  addProduct: (p: Omit<Product, 'id'>) => Product
  updateProduct: (id: string, update: Partial<Product>) => void
  deleteProduct: (id: string) => void
  categories: Category[]
}

const ProductsContext = createContext<ProductsContextType | null>(null)

const STORAGE_KEY = 'forbeauty.products'

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seedProducts)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: Product[] = JSON.parse(raw)
        if (Array.isArray(parsed)) setProducts(parsed)
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    } catch {}
  }, [products])

  const addProduct = (p: Omit<Product, 'id'>) => {
    const id = 'p-' + Math.random().toString(36).slice(2, 8)
    const newP: Product = { id, ...p }
    setProducts(prev => [newP, ...prev])
    return newP
  }

  const updateProduct = (id: string, update: Partial<Product>) => {
    setProducts(prev => prev.map(item => item.id === id ? { ...item, ...update, id: item.id } : item))
  }

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(item => item.id !== id))
  }

  const categories: Category[] = useMemo(() => ['face','eyes','lips','skincare','tools'], [])

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, categories }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('ProductsContext not found')
  return ctx
}
