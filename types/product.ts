export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  specs?: ProductSpecs
  createdAt?: Date
  updatedAt?: Date
}

export interface ProductSpecs {
  network?: string
  body?: string
  display?: string
  platform?: string
  camera?: string
  memory?: string
  battery?: string
  security?: string
  features?: string
}
