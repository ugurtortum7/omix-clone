import { ref } from 'vue'
import { defineStore } from 'pinia'
import { db } from "~/composables/useFirebase"
import { collection, addDoc, getDocs, doc, updateDoc, query, where, orderBy } from 'firebase/firestore'
import type { Order } from "~/types"
import { OrderStatus } from "~/types"
import { apiFetch, useApiConfig } from '~/composables/useLocalApi'

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([])
  const currentOrder = ref<Order | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { useLocalApi } = useApiConfig()

  // Actions
  async function createOrder(orderData: Omit<Order, 'id' | 'createdAt'>) {
    loading.value = true
    error.value = null
    
    try {
      if (useLocalApi) {
        const created = await apiFetch<Order>('/orders', {
          method: 'POST',
          body: JSON.stringify(orderData)
        })
        currentOrder.value = created
        return created
      } else {
        const orderWithTimestamp = {
          ...orderData,
          createdAt: new Date()
        }
        
        const docRef = await addDoc(collection(db, 'orders'), orderWithTimestamp)
        
        currentOrder.value = {
          id: docRef.id,
          ...orderWithTimestamp
        } as Order
        
        return currentOrder.value
      }
    } catch (err: any) {
      error.value = err.message
      console.error('Sipariş oluşturulurken hata:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchUserOrders(userId: string) {
    loading.value = true
    error.value = null
    
    try {
      if (useLocalApi) {
        orders.value = await apiFetch<Order[]>(`/orders?userId=${encodeURIComponent(userId)}`)
        return orders.value
      } else {
        const ordersCol = collection(db, 'orders')
        const q = query(
          ordersCol, 
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        )
        const ordersSnapshot = await getDocs(q)
        
        orders.value = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Order))
        
        return orders.value
      }
    } catch (err: any) {
      error.value = err.message
      console.error('Siparişler yüklenirken hata:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  async function updateOrderStatus(orderId: string, status: OrderStatus) {
    loading.value = true
    error.value = null
    
    try {
      if (useLocalApi) {
        const updated = await apiFetch<Order>(`/orders/${orderId}/status`, {
          method: 'PUT',
          body: JSON.stringify({ status })
        })
        const order = orders.value.find(o => o.id === orderId)
        if (order) {
          order.status = updated.status
          order.updatedAt = updated.updatedAt
        }
        return true
      } else {
        const orderRef = doc(db, 'orders', orderId)
        await updateDoc(orderRef, {
          status,
          updatedAt: new Date()
        })
        
        // Yerel state'i güncelle
        const order = orders.value.find(o => o.id === orderId)
        if (order) {
          order.status = status
          order.updatedAt = new Date()
        }
        
        return true
      }
    } catch (err: any) {
      error.value = err.message
      console.error('Sipariş durumu güncellenirken hata:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    orders,
    currentOrder,
    loading,
    error,
    createOrder,
    fetchUserOrders,
    updateOrderStatus
  }
})
