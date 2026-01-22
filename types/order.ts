import type { BasketItem } from './basket'
import type { UserAddress } from './user'

export interface Order {
  id: string
  userId: string
  items: BasketItem[]
  totalAmount: number
  status: OrderStatus
  shippingAddress: UserAddress
  paymentMethod: string
  createdAt: Date
  updatedAt?: Date
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}
