import { Link, NavLink } from 'react-router-dom'
import { useCart } from '@context/CartContext'
import { useState } from 'react'

export default function Navbar() {
  const { items, toggle } = useCart()
  const [hasLogo, setHasLogo] = useState(true)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-primary">
      <div className="container mx-auto px-4 container-max">
        <div className="flex h-36 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-charcoal">
            {hasLogo ? (
              <img src="/logo.png" alt="ForBeauty.mv" className="h-32 w-auto" onError={() => setHasLogo(false)} />
            ) : (
              <span>ForBeauty.mv</span>
            )}
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-charcoal' : 'text-charcoal hover:text-secondary'}>Home</NavLink>
            <NavLink to="/shop" className={({ isActive }) => isActive ? 'text-charcoal' : 'text-charcoal hover:text-secondary'}>Shop</NavLink>
            <a className="text-charcoal hover:text-secondary" href="#categories">Categories</a>
            <a className="text-charcoal hover:text-secondary" href="#about">About</a>
            <a className="text-charcoal hover:text-secondary" href="#contact">Contact</a>
          </nav>
          <button className="relative inline-flex items-center rounded-md px-3 py-2 text-charcoal hover:bg-primary" onClick={() => toggle(true)} aria-label="Cart">
            <span className="mr-2">Cart</span>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-white text-xs">{count}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
