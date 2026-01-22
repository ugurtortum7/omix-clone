export interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category?: string
  stock?: number
  createdAt: string
  updatedAt?: string
}

export interface User {
  id: string
  email: string
  displayName: string
  photoURL?: string
  phoneNumber?: string
  createdAt: string
  updatedAt?: string
}

export interface BasketItem {
  id: string
  productId: string
  name: string
  price: number
  image?: string
  quantity: number
  addedAt: string
}

export interface Basket {
  userId: string
  items: BasketItem[]
  totalItems: number
  totalPrice: number
  updatedAt: string
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface Order {
  id: string
  userId: string
  items: BasketItem[]
  totalAmount: number
  status: OrderStatus
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: string
  createdAt: string
  updatedAt?: string
}

export interface Database {
  products: Product[]
  users: User[]
  baskets: Record<string, Basket>
  orders: Order[]
}

export const db: Database = {
  products: [
    {
      id: 'o1-neo',
      name: 'O1 Neo',
      description: '64 MP yüksek çözünürlüklü kamerası, Dolby Atmos ve 5000 mAh pil.',
      price: 8999,
      image: '/o1-neo.png',
      category: 'mobil',
      stock: 50,
      createdAt: new Date().toISOString()
    }
  ],
  users: [],
  baskets: {},
  orders: []
}
