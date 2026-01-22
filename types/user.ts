export interface User {
  id: string
  email: string
  displayName: string
  photoURL?: string
  phoneNumber?: string
  address?: UserAddress
  createdAt?: Date
  updatedAt?: Date
}

export interface UserAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}
