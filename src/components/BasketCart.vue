<template>
  <div class="basket-container">
    <h1 class="basket-title">Sepetim</h1>

    <div class="basket-content">
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Sepetinizde toplam ({{ cartItems.length }}) adet ürün bulunmaktadır.</p>
      </div>

      <div v-else>
        <p class="cart-info">
          Sepetinizde toplam ({{ cartItems.length }}) adet ürün bulunmaktadır.
        </p>

        <table class="cart-table">
          <thead>
            <tr>
              <th>Ürün Adı</th>
              <th>Fiyat</th>
              <th>Adet</th>
              <th>Toplam</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id" class="cart-item">
              <td class="product-info">
                <img :src="item.image" :alt="item.name" class="product-image" />
                <span>{{ item.name }}</span>
              </td>
              <td class="price">{{ formatPrice(item.price) }}</td>
              <td class="quantity">
                <input
                  type="number"
                  v-model.number="item.quantity"
                  min="1"
                  class="quantity-input"
                  @change="updateQuantity(item)"
                />
              </td>
              <td class="total">{{ formatPrice(item.price * item.quantity) }}</td>
              <td class="actions">
                <button @click="removeItem(item.id)" class="remove-btn">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="discount-section">
          <input
            type="text"
            v-model="discountCode"
            placeholder="İndirim Kodu"
            class="discount-input"
          />
        </div>

        <div class="summary-section">
          <button @click="applyDiscount" class="apply-btn">Uygula</button>

          <div class="summary-details">
            <div class="summary-row">
              <span class="label">Sepet Toplamı:</span>
              <span class="value">{{ formatPrice(cartTotal) }}</span>
            </div>
            <div class="summary-row">
              <span class="label">Kargo Ücreti:</span>
              <span class="value">{{
                shippingFee > 0 ? formatPrice(shippingFee) : 'Ücretsiz'
              }}</span>
            </div>
            <div class="summary-row total-row">
              <span class="label">Toplam:</span>
              <span class="value">{{ formatPrice(grandTotal) }}</span>
            </div>
          </div>

          <button @click="checkout" class="checkout-btn">Satın Al</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const cartItems = ref([
  {
    id: 1,
    name: 'O1 Neo 5 GB Ram - 128 GB - Siyah',
    price: 8999.0,
    quantity: 1,
    image: '/black-neo.png'
  }
])

const discountCode = ref('')

const cartTotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const shippingFee = computed(() => {
  return 0 // Free shipping
})

const grandTotal = computed(() => {
  return cartTotal.value + shippingFee.value
})

const formatPrice = (price) => {
  return `${price.toFixed(2)} TL`
}

const updateQuantity = (item) => {
  if (item.quantity < 1) {
    item.quantity = 1
  }
}

const removeItem = (id) => {
  const index = cartItems.value.findIndex((item) => item.id === id)
  if (index !== -1) {
    cartItems.value.splice(index, 1)
  }
}

const applyDiscount = () => {
  if (discountCode.value) {
    alert(`İndirim kodu "${discountCode.value}" uygulanıyor...`)
  }
}

const checkout = () => {
  alert('Satın alma işlemi başlatılıyor...')
}
</script>

<style scoped>
.basket-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.basket-title {
  font-size: 48px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 40px;
  letter-spacing: 0.5px;
}

.basket-content {
  background: white;
  padding: 30px;
}

.empty-cart,
.cart-info {
  text-align: center;
  font-size: 14px;
  color: #333;
  margin-bottom: 30px;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

.cart-table thead {
  border-bottom: 1px solid #e0e0e0;
}

.cart-table th {
  text-align: left;
  padding: 15px 10px;
  font-weight: 400;
  font-size: 14px;
  color: #666;
}

.cart-table th:last-child {
  width: 50px;
}

.cart-item {
  border-bottom: 1px solid #f0f0f0;
}

.cart-table td {
  padding: 20px 10px;
  vertical-align: middle;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.product-info span {
  font-size: 14px;
  color: #333;
}

.price,
.total {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
}

.quantity-input {
  width: 60px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
}

.quantity-input:focus {
  outline: none;
  border-color: #000;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: #666;
  transition: color 0.3s;
}

.remove-btn:hover {
  color: #000;
}

.discount-section {
  margin-bottom: 20px;
}

.discount-input {
  width: 100%;
  max-width: 400px;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.discount-input:focus {
  outline: none;
  border-color: #000;
}

.discount-input::placeholder {
  color: #999;
}

.summary-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
}

.apply-btn {
  background: #000;
  color: white;
  border: none;
  padding: 12px 40px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.3s;
}

.apply-btn:hover {
  background: #333;
}

.summary-details {
  min-width: 300px;
  text-align: right;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
}

.summary-row .label {
  color: #666;
}

.summary-row .value {
  color: #333;
  font-weight: 500;
}

.total-row {
  border-top: 1px solid #e0e0e0;
  margin-top: 10px;
  padding-top: 15px;
  font-size: 16px;
}

.total-row .label,
.total-row .value {
  font-weight: 600;
  color: #000;
}

.checkout-btn {
  background: #000;
  color: white;
  border: none;
  padding: 14px 50px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.3s;
  min-width: 200px;
}

.checkout-btn:hover {
  background: #333;
}

@media (max-width: 768px) {
  .basket-title {
    font-size: 32px;
  }

  .cart-table {
    font-size: 12px;
  }

  .product-image {
    width: 40px;
    height: 40px;
  }

  .product-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .quantity-input {
    width: 50px;
  }

  .summary-section {
    align-items: stretch;
  }

  .summary-details {
    min-width: auto;
  }

  .apply-btn,
  .checkout-btn {
    width: 100%;
  }
}
</style>
