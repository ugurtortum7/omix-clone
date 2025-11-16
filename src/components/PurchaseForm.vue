<template>
  <div class="purchase-container">
    <div class="purchase-content">
      <!-- Product Image Section -->
      <div class="product-image-section">
        <img :src="selectedColor.image" :alt="`O1 Neo ${selectedColor.name}`" class="product-img" />

        <!-- Delivery Options -->
        <div class="delivery-options">
          <div class="delivery-option">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
              ></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            <span>Hızlı teslimat</span>
          </div>
          <div class="delivery-option">
            <div class="icon-with-arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                ></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              <svg
                class="return-arrow"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="9 14 4 9 9 4"></polyline>
                <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
              </svg>
            </div>
            <span>Ücretsiz iade</span>
          </div>
        </div>
      </div>

      <!-- Product Details Section -->
      <div class="product-details-section">
        <!-- Model -->
        <div class="detail-group">
          <label class="detail-label">Model</label>
          <div class="model-display">O1 Neo</div>
        </div>

        <!-- Color Selection -->
        <div class="detail-group">
          <label class="detail-label">Renginizi seçin</label>
          <div class="color-options">
            <button
              v-for="color in colors"
              :key="color.id"
              @click="selectedColor = color"
              :class="['color-btn', { active: selectedColor.id === color.id }]"
              :style="{ color: color.hex }"
            >
              <span class="color-name">{{ color.name }}</span>
            </button>
          </div>
        </div>

        <!-- Capacity Selection -->
        <div class="detail-group">
          <label class="detail-label">Kapasite seçin</label>
          <div class="capacity-options">
            <button
              v-for="capacity in capacities"
              :key="capacity.id"
              @click="selectedCapacity = capacity"
              :class="['capacity-btn', { active: selectedCapacity.id === capacity.id }]"
            >
              <div class="capacity-text">{{ capacity.label }}</div>
              <div class="capacity-price">Fiyat: {{ capacity.price }}</div>
            </button>
          </div>
        </div>

        <!-- Price -->
        <div class="price-section">
          <div class="price">{{ selectedCapacity.priceAmount }}</div>
          <div class="price-note">KDV ve yasal ücretler dahildir.</div>
        </div>

        <!-- Stock Status -->
        <div class="status-section">
          <div class="status-title">Durum:</div>
          <div class="status-text">Stokta var</div>
          <div class="status-text">Ücretsiz Gönderim</div>
        </div>

        <!-- Add to Cart Button -->
        <button class="add-to-cart-btn">Sepetinize ekleyin</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const colors = [
  { id: 'black', name: 'Siyah', hex: '#000000', image: '/black-neo.png' },
  { id: 'white', name: 'Beyaz', hex: '#FFFFFF', image: '/white-neo.png' },
  { id: 'gold', name: 'Gold', hex: '#D4AF7A', image: '/gold-neo.png' },
  { id: 'blue', name: 'Mavi', hex: '#A5C8E1', image: '/purple-neo.png' },
  { id: 'pink', name: 'Pembe', hex: '#E8B4D4', image: '/pink-neo.png' },
  { id: 'turquoise', name: 'Turkuaz', hex: '#40E0D0', image: '/turqouse-neo.png' }
]

const capacities = [
  { id: '6-128', label: '6 GB Ram - 128 GB', price: '8.999,00 TL', priceAmount: '8.999,00 TL' }
]

const selectedColor = ref(colors[0])
const selectedCapacity = ref(capacities[0])
</script>

<style scoped>
.purchase-container {
  min-height: 100vh;
  background: white;
  padding: 60px 20px;
}

.purchase-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

.product-image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-img {
  max-width: 400px;
  width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 40px;
}

.delivery-options {
  display: flex;
  gap: 60px;
  margin-top: 60px;
}

.delivery-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #666;
  font-size: 14px;
}

.delivery-option svg {
  width: 50px;
  height: 50px;
  color: #333;
}

.icon-with-arrow {
  display: flex;
  align-items: center;
  gap: 8px;
}

.return-arrow {
  width: 24px;
  height: 24px;
  color: #333;
}

.product-details-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.detail-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail-label {
  font-size: 18px;
  font-weight: 400;
  color: #333;
}

.model-display {
  padding: 15px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  font-size: 16px;
  color: #333;
  background: white;
}

.color-options {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.color-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.color-btn::before {
  content: '';
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #e0e0e0;
  display: block;
  background: currentColor;
}

.color-btn.active::before {
  border: 3px solid #333;
  box-shadow:
    0 0 0 2px white,
    0 0 0 4px #333;
}

.color-name {
  font-size: 13px;
  color: #666;
}

.capacity-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.capacity-btn {
  padding: 15px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
}

.capacity-btn.active {
  border-color: #333;
  background: #f9f9f9;
}

.capacity-text {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  margin-bottom: 5px;
}

.capacity-price {
  font-size: 13px;
  color: #666;
}

.price-section {
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}

.price {
  font-size: 36px;
  font-weight: 600;
  color: #000;
  margin-bottom: 8px;
}

.price-note {
  font-size: 13px;
  color: #666;
}

.status-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.status-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.status-text {
  font-size: 14px;
  color: #666;
}

.add-to-cart-btn {
  background: #000;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 16px 40px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
}

.add-to-cart-btn:hover {
  background: #333;
}

@media (max-width: 968px) {
  .purchase-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .product-img {
    max-width: 300px;
  }

  .delivery-options {
    gap: 30px;
  }
}
</style>
