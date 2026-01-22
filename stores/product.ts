import { ref } from 'vue'
import { defineStore } from 'pinia'
import { db } from "~/composables/useFirebase"
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore'
import type { Product } from "~/types"
import { apiFetch, useApiConfig } from '~/composables/useLocalApi'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { useLocalApi } = useApiConfig()

  // Actions
  async function fetchProducts() {
    loading.value = true
    error.value = null
    
    try {
      if (useLocalApi) {
        products.value = await apiFetch<Product[]>('/products')
        return products.value
      } else {
        const productsCol = collection(db, 'products')
        const productsSnapshot = await getDocs(productsCol)
        products.value = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Product))
        
        return products.value
      }
    } catch (err: any) {
      error.value = err.message
      console.error('Ürünler yüklenirken hata:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  async function fetchProductById(id: string) {
    loading.value = true
    error.value = null
    
    try {
      if (useLocalApi) {
        currentProduct.value = await apiFetch<Product>(`/products/${id}`)
        return currentProduct.value
      } else {
        const productDoc = await getDoc(doc(db, 'products', id))
        if (productDoc.exists()) {
          currentProduct.value = {
            id: productDoc.id,
            ...productDoc.data()
          } as Product
          return currentProduct.value
        } else {
          error.value = 'Ürün bulunamadı'
          return null
        }
      }
    } catch (err: any) {
      error.value = err.message
      console.error('Ürün yüklenirken hata:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchProductsByCategory(category: string) {
    loading.value = true
    error.value = null
    
    try {
      if (useLocalApi) {
        const allProducts = await apiFetch<Product[]>('/products')
        return allProducts.filter(product => product.category === category)
      } else {
        const productsCol = collection(db, 'products')
        const q = query(productsCol, where('category', '==', category))
        const productsSnapshot = await getDocs(q)
        
        const categoryProducts = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Product))
        
        return categoryProducts
      }
    } catch (err: any) {
      error.value = err.message
      console.error('Kategori ürünleri yüklenirken hata:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    currentProduct,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    fetchProductsByCategory
  }
})
