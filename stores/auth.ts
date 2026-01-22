import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { auth } from "~/composables/useFirebase"
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  type User as FirebaseUser
} from 'firebase/auth'
import type { User } from "~/types"
import { db } from "~/composables/useFirebase"
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { apiFetch, useApiConfig } from '~/composables/useLocalApi'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { useLocalApi } = useApiConfig()

  // Computed
  const isAuthenticated = computed(() => !!user.value)

  // Actions
  async function signIn(email: string, password: string) {
    loading.value = true
    error.value = null
    
    try {
      if (useLocalApi) {
        const localUser = await apiFetch<User>(`/users?email=${encodeURIComponent(email)}`)
        user.value = localUser
        if (process.client) {
          localStorage.setItem('localUserId', localUser.id)
        }
        return true
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        await loadUserData(userCredential.user.uid)
        return true
      }
    } catch (err: any) {
      error.value = err.message
      console.error('Giriş hatası:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  async function register(email: string, password: string, displayName: string) {
    loading.value = true
    error.value = null
    
    try {
      if (useLocalApi) {
        const now = new Date()
        const userData: Omit<User, 'id'> = {
          email: email,
          displayName: displayName,
          createdAt: now,
          updatedAt: now
        }
        const localUser = await apiFetch<User>('/users', {
          method: 'POST',
          body: JSON.stringify(userData)
        })
        user.value = localUser
        if (process.client) {
          localStorage.setItem('localUserId', localUser.id)
        }
        return true
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        
        // Kullanıcı profil bilgilerini güncelle
        await updateProfile(userCredential.user, { displayName })
        
        // Firestore'a kullanıcı kaydı oluştur
        const userData: User = {
          id: userCredential.user.uid,
          email: email,
          displayName: displayName,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        await setDoc(doc(db, 'users', userCredential.user.uid), userData)
        user.value = userData
        
        return true
      }
    } catch (err: any) {
      error.value = err.message
      console.error('Kayıt hatası:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  async function signOut() {
    loading.value = true
    error.value = null
    
    try {
      if (useLocalApi) {
        user.value = null
        if (process.client) {
          localStorage.removeItem('localUserId')
        }
        return true
      } else {
        await firebaseSignOut(auth)
        user.value = null
        return true
      }
    } catch (err: any) {
      error.value = err.message
      console.error('Çıkış hatası:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  async function loadUserData(uid: string) {
    try {
      if (useLocalApi) {
        const localUser = await apiFetch<User>(`/users/${uid}`)
        user.value = localUser
      } else {
        const userDoc = await getDoc(doc(db, 'users', uid))
        if (userDoc.exists()) {
          user.value = userDoc.data() as User
        }
      }
    } catch (err) {
      console.error('Kullanıcı verisi yüklenirken hata:', err)
    }
  }

  function initAuthListener() {
    if (useLocalApi) {
      if (process.client) {
        const storedId = localStorage.getItem('localUserId')
        if (storedId) {
          loadUserData(storedId)
        } else {
          user.value = null
        }
      }
      return
    }
    onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        await loadUserData(firebaseUser.uid)
      } else {
        user.value = null
      }
    })
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    signIn,
    register,
    signOut,
    initAuthListener
  }
})
