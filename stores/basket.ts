import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { db } from "~/composables/useFirebase"
import { doc, setDoc, getDoc } from 'firebase/firestore'
import type { BasketItem, Basket } from "~/types"
import { apiFetch, useApiConfig } from '~/composables/useLocalApi'

export const useBasketStore = defineStore('basket', () => {
  const items = ref<BasketItem[]>([])
  const userId = ref<string>('')
  const { useLocalApi } = useApiConfig()

  // Computed
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  // Actions
  async function loadBasket(uid: string) {
    userId.value = uid
    try {
      if (useLocalApi) {
        const data = await apiFetch<Basket>(`/baskets/${uid}`)
        items.value = data.items || []
      } else {
        const basketRef = doc(db, 'baskets', uid)
        const basketSnap = await getDoc(basketRef)
        
        if (basketSnap.exists()) {
          const data = basketSnap.data() as Basket
          items.value = data.items || []
        } else {
          items.value = []
        }
      }
    } catch (error) {
      console.error('Sepet yüklenirken hata:', error)
      items.value = []
    }
  }

  async function saveBasket() {
    if (!userId.value) {
      console.error('❌ UserId boş, sepet kaydedilemiyor!')
      return
    }
    
    console.log('💾 saveBasket çağrıldı - UserId:', userId.value)
    
    try {
      const basketData: Basket = {
        userId: userId.value,
        items: items.value,
        totalItems: totalItems.value,
        totalPrice: totalPrice.value,
        updatedAt: new Date()
      }
      
      console.log('📤 Firebase\'e kaydedilecek veri:', basketData)
      if (useLocalApi) {
        await apiFetch<Basket>(`/baskets/${userId.value}`, {
          method: 'PUT',
          body: JSON.stringify(basketData)
        })
      } else {
        const basketRef = doc(db, 'baskets', userId.value)
        await setDoc(basketRef, basketData)
      }
      console.log('✅ Firebase\'e başarıyla kaydedildi!')
    } catch (error) {
      console.error('❌ Sepet kaydedilirken hata:', error)
      throw error
    }
  }

  async function addToBasket(product: Omit<BasketItem, 'quantity' | 'addedAt'>) {
    console.log('🛒 addToBasket çağrıldı - UserId:', userId.value)
    console.log('🛒 Ürün bilgisi:', product)
    console.log('🛒 Mevcut sepet:', items.value)
    
    const existingItem = items.value.find(item => item.productId === product.productId)
    
    if (existingItem) {
      console.log('✅ Ürün zaten sepette, miktar artırılıyor')
      existingItem.quantity++
    } else {
      console.log('✅ Yeni ürün sepete ekleniyor')
      items.value.push({ 
        ...product, 
        quantity: 1,
        addedAt: new Date()
      })
    }
    
    console.log('💾 Sepet kaydediliyor...')
    await saveBasket()
    console.log('✅ Sepet kaydedildi. Güncel sepet:', items.value)
  }

  async function removeFromBasket(productId: string) {
    const index = items.value.findIndex(item => item.productId === productId)
    if (index > -1) {
      items.value.splice(index, 1)
      await saveBasket()
    }
  }

  async function updateQuantity(productId: string, quantity: number) {
    const item = items.value.find(item => item.productId === productId)
    if (item) {
      if (quantity <= 0) {
        await removeFromBasket(productId)
      } else {
        item.quantity = quantity
        await saveBasket()
      }
    }
  }

  async function clearBasket() {
    items.value = []
    await saveBasket()
  }

  return {
    items,
    totalItems,
    totalPrice,
    loadBasket,
    addToBasket,
    removeFromBasket,
    updateQuantity,
    clearBasket
  }
})
