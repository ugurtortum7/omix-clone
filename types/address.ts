export interface Address {
  id: string
  userId: string
  type: 'delivery' | 'billing'
  name: string
  postalCode: string
  country: string
  city: string
  district: string
  address: string
  createdAt: Date
  updatedAt?: Date
}
