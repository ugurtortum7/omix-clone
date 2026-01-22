export interface BasketItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  addedAt: Date
}

export interface Basket {
  userId: string
  items: BasketItem[]
  totalItems: number
  totalPrice: number
  updatedAt: Date
}
