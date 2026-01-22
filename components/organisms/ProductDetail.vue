<template>
  <div class="product-container">
    <div class="product-content">
      <div class="product-image">
        <img src="/o1-neo.png" alt="O1 Neo" />
      </div>

      <div class="product-info">
        <h1 class="product-title">O1 Neo</h1>

        <div class="product-description">
          <p>64 MP yüksek çözünürlüklü kamerası,</p>
          <p>Dolby Atmos ses teknolojisi ve</p>
          <p>çarpıcı renkleriyle</p>
          <p>kendi stilini özgürce yansıt.</p>
        </div>

        <div class="button-group">
          <button class="explore-btn" @click="goToTechFeatures">KEŞFET</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useBasketStore } from "~/stores/basket"
import { useAuthStore } from "~/stores/auth"

const router = useRouter()
const basketStore = useBasketStore()
const authStore = useAuthStore()

const goToTechFeatures = () => {
  router.push('/tech-features')
}

const addToBasket = async () => {
  console.log('🔵 addToBasket butonu tıklandı')
  console.log('👤 isAuthenticated:', authStore.isAuthenticated)
  console.log('👤 User:', authStore.user)
  
  // Önce giriş kontrolü yap
  if (!authStore.isAuthenticated) {
    alert('Sepete ürün eklemek için giriş yapmalısınız!')
    router.push('/sign-in')
    return
  }
  
  try {
    console.log('📦 Sepet yükleniyor...')
    // Sepeti her zaman yükle
    if (authStore.user) {
      await basketStore.loadBasket(authStore.user.id)
      console.log('✅ Sepet yüklendi. Mevcut items:', basketStore.items)
    }
    
    console.log('➕ Sepete ürün ekleniyor...')
    // Sepete ekle
    await basketStore.addToBasket({
      id: 'product-1',
      productId: 'o1-neo',
      name: 'O1 Neo',
      price: 8999,
      image: '/o1-neo.png'
    })
    
    console.log('✅ Ürün eklendi. Toplam items:', basketStore.items.length)
    alert('O1 Neo sepete eklendi!')
  } catch (error) {
    console.error('❌ Sepete ekleme hatası:', error)
    alert('Ürün sepete eklenirken bir hata oluştu: ' + error)
  }
}
</script>

<style scoped>
.product-container {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: white;
}

.product-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 60px;
  max-width: 1100px;
  width: 100%;
  background: #e1e3e3;
  border-radius: 30px;
  padding: 70px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.product-image {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.product-image img {
  max-width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
}

.product-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  text-align: left;
  flex: 1;
}

.product-title {
  font-size: 48px;
  font-weight: 700;
  margin: 0;
  color: #000;
  letter-spacing: -1px;
}

.product-description {
  font-size: 16px;
  color: #888;
  line-height: 1.6;
}

.product-description p {
  margin: 0;
}

.button-group {
  display: flex;
  gap: 15px;
  align-self: flex-start;
}

.explore-btn {
  background: #888;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 40px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  letter-spacing: 1px;
}

.explore-btn:hover {
  background: #666;
}

.add-to-cart-btn {
  background: #000;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 40px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  letter-spacing: 1px;
}

.add-to-cart-btn:hover {
  background: #333;
}

@media (max-width: 768px) {
  .product-content {
    flex-direction: column;
    gap: 40px;
  }

  .button-group {
    flex-direction: column;
    width: 100%;
  }

  .explore-btn,
  .add-to-cart-btn {
    width: 100%;
  }

  .product-info {
    align-items: center;
    text-align: center;
  }

  .explore-btn {
    align-self: center;
  }

  .product-title {
    font-size: 48px;
  }

  .product-description {
    font-size: 16px;
  }
}
</style>
