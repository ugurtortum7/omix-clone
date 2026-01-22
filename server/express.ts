import express from 'express'
import { randomUUID } from 'crypto'
import { db, type Basket, type BasketItem, type Order, type OrderStatus, type Product, type User } from './db'

const app = express()
const port = Number(process.env.API_PORT || 4000)

app.use(express.json())

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (_req.method === 'OPTIONS') {
    res.sendStatus(204)
    return
  }
  next()
})

app.get('/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() })
})

// Products
app.get('/products', (_req, res) => {
  res.json(db.products)
})

app.get('/products/:id', (req, res) => {
  const product = db.products.find(p => p.id === req.params.id)
  if (!product) {
    res.status(404).json({ error: 'Product not found' })
    return
  }
  res.json(product)
})

app.post('/products', (req, res) => {
  const payload = req.body as Omit<Product, 'id' | 'createdAt'>
  const now = new Date().toISOString()
  const product: Product = {
    ...payload,
    id: randomUUID(),
    createdAt: now
  }
  db.products.push(product)
  res.status(201).json(product)
})

app.put('/products/:id', (req, res) => {
  const product = db.products.find(p => p.id === req.params.id)
  if (!product) {
    res.status(404).json({ error: 'Product not found' })
    return
  }
  Object.assign(product, req.body, { updatedAt: new Date().toISOString() })
  res.json(product)
})

// Users
app.post('/users', (req, res) => {
  const payload = req.body as Omit<User, 'id' | 'createdAt'>
  const now = new Date().toISOString()
  const user: User = {
    ...payload,
    id: randomUUID(),
    createdAt: now
  }
  db.users.push(user)
  res.status(201).json(user)
})

app.get('/users', (req, res) => {
  const email = String(req.query.email || '')
  if (!email) {
    res.json(db.users)
    return
  }
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }
  res.json(user)
})

app.get('/users/:id', (req, res) => {
  const user = db.users.find(u => u.id === req.params.id)
  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }
  res.json(user)
})

app.put('/users/:id', (req, res) => {
  const user = db.users.find(u => u.id === req.params.id)
  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }
  Object.assign(user, req.body, { updatedAt: new Date().toISOString() })
  res.json(user)
})

// Baskets
app.get('/baskets/:userId', (req, res) => {
  const basket = db.baskets[req.params.userId]
  if (!basket) {
    res.json({
      userId: req.params.userId,
      items: [],
      totalItems: 0,
      totalPrice: 0,
      updatedAt: new Date().toISOString()
    } satisfies Basket)
    return
  }
  res.json(basket)
})

app.put('/baskets/:userId', (req, res) => {
  const payload = req.body as Basket
  const updated: Basket = {
    ...payload,
    userId: req.params.userId,
    updatedAt: new Date().toISOString()
  }
  db.baskets[req.params.userId] = updated
  res.json(updated)
})

app.post('/baskets/:userId/items', (req, res) => {
  const basket = db.baskets[req.params.userId] || {
    userId: req.params.userId,
    items: [],
    totalItems: 0,
    totalPrice: 0,
    updatedAt: new Date().toISOString()
  }
  const payload = req.body as Omit<BasketItem, 'id' | 'addedAt'>
  const item: BasketItem = {
    ...payload,
    id: randomUUID(),
    addedAt: new Date().toISOString()
  }
  basket.items.push(item)
  basket.totalItems = basket.items.reduce((sum, i) => sum + i.quantity, 0)
  basket.totalPrice = basket.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  basket.updatedAt = new Date().toISOString()
  db.baskets[req.params.userId] = basket
  res.status(201).json(basket)
})

// Orders
app.post('/orders', (req, res) => {
  const payload = req.body as Omit<Order, 'id' | 'createdAt'>
  const now = new Date().toISOString()
  const order: Order = {
    ...payload,
    id: randomUUID(),
    createdAt: now,
    status: payload.status || 'pending'
  }
  db.orders.push(order)
  res.status(201).json(order)
})

app.get('/orders', (req, res) => {
  const userId = String(req.query.userId || '')
  if (!userId) {
    res.json(db.orders)
    return
  }
  res.json(db.orders.filter(o => o.userId === userId))
})

app.put('/orders/:id/status', (req, res) => {
  const order = db.orders.find(o => o.id === req.params.id)
  if (!order) {
    res.status(404).json({ error: 'Order not found' })
    return
  }
  const status = req.body.status as OrderStatus
  if (!status) {
    res.status(400).json({ error: 'Missing status' })
    return
  }
  order.status = status
  order.updatedAt = new Date().toISOString()
  res.json(order)
})

app.listen(port, () => {
  console.log(`Express API running on http://localhost:${port}`)
})
