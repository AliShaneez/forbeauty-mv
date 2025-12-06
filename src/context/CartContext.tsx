import { createContext, useContext, useMemo, useState } from 'react'
import type { Product } from '@data/products'

export type CartItem = {
  product: Product
  quantity: number
  shade?: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, shade?: string) => void
  removeItem: (productId: string, shade?: string) => void
  updateQuantity: (productId: string, quantity: number, shade?: string) => void
  isOpen: boolean
  toggle: (open?: boolean) => void
  clear: () => void
  subtotal: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (product: Product, quantity = 1, shade?: string) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.product.id === product.id && i.shade === shade)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity }
        return copy
      }
      return [...prev, { product, quantity, shade }]
    })
  }

  const removeItem = (productId: string, shade?: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.shade === shade)))
  }

  const updateQuantity = (productId: string, quantity: number, shade?: string) => {
    setItems(prev => prev.map(i => i.product.id === productId && i.shade === shade ? { ...i, quantity } : i))
  }

  const toggle = (open?: boolean) => {
    setIsOpen(v => open ?? !v)
  }

  const clear = () => setItems([])

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0), [items])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, isOpen, toggle, clear, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('CartContext not found')
  return ctx
}
