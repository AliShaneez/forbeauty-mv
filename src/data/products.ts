export type Category = 'face' | 'eyes' | 'lips' | 'skincare' | 'tools'

export type Product = {
  id: string
  name: string
  brand: string
  category: Category
  price: number
  imageUrl: string
  isNew?: boolean
  isOnSale?: boolean
  isBestSeller?: boolean
  shades?: string[]
  description?: string
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Soft Matte Foundation',
    brand: 'Maybelline',
    category: 'face',
    price: 280,
    imageUrl: 'https://via.placeholder.com/500x500.png?text=Foundation',
    isBestSeller: true,
    shades: ['Ivory', 'Beige', 'Sand', 'Caramel'],
    description: 'Medium coverage foundation with soft matte finish.'
  },
  {
    id: 'p2',
    name: 'Liquid Lipstick',
    brand: 'Huda Beauty',
    category: 'lips',
    price: 220,
    imageUrl: 'https://via.placeholder.com/500x500.png?text=Lipstick',
    isNew: true,
    shades: ['Rose', 'Crimson', 'Nude'],
    description: 'Long-wear liquid lipstick with high pigment.'
  },
  {
    id: 'p3',
    name: 'Neutral Eyeshadow Palette',
    brand: 'ColourPop',
    category: 'eyes',
    price: 310,
    imageUrl: 'https://via.placeholder.com/500x500.png?text=Eyeshadow',
    isOnSale: true,
    description: '12-pan palette with blendable neutrals.'
  },
  {
    id: 'p4',
    name: 'Hydrating Moisturizer',
    brand: 'CeraVe',
    category: 'skincare',
    price: 180,
    imageUrl: 'https://via.placeholder.com/500x500.png?text=Moisturizer',
    description: 'Daily moisturizer suitable for all skin types.'
  },
  {
    id: 'p5',
    name: 'Blush Brush',
    brand: 'Real Techniques',
    category: 'tools',
    price: 120,
    imageUrl: 'https://via.placeholder.com/500x500.png?text=Brush',
    description: 'Soft bristles for seamless blush application.'
  },
  {
    id: 'p6',
    name: 'Glow Highlighter',
    brand: 'Fenty Beauty',
    category: 'face',
    price: 260,
    imageUrl: 'https://via.placeholder.com/500x500.png?text=Highlighter',
    isBestSeller: true,
    description: 'Finely milled highlighter for a radiant glow.'
  },
  {
    id: 'p7',
    name: 'Volumizing Mascara',
    brand: 'Essence',
    category: 'eyes',
    price: 95,
    imageUrl: 'https://via.placeholder.com/500x500.png?text=Mascara',
    description: 'Buildable mascara for bold lashes.'
  },
  {
    id: 'p8',
    name: 'Lip Balm',
    brand: 'Laneige',
    category: 'lips',
    price: 140,
    imageUrl: 'https://via.placeholder.com/500x500.png?text=Lip+Balm',
    description: 'Hydrating lip balm with shine.'
  }
]
