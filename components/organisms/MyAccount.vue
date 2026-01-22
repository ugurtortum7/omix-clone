<template>
  <div class="account-container">
    <h1 class="account-title">{{ currentTabLabel }}</h1>

    <div class="account-content">
      <!-- Sidebar Navigation -->
      <div class="account-sidebar">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Main Content Area -->
      <div class="account-main">
        <!-- Hesabım Tab -->
        <div v-if="activeTab === 'account'" class="form-section">
          <form @submit.prevent="handleSave" class="account-form">
            <div class="form-row">
              <div class="form-group">
                <label>Ad</label>
                <input type="text" v-model="formData.firstName" class="form-input" />
              </div>
              <div class="form-group">
                <label>Soyad</label>
                <input type="text" v-model="formData.lastName" class="form-input" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>E-Posta</label>
                <input type="email" v-model="formData.email" class="form-input" />
              </div>
              <div class="form-group">
                <label>Telefon</label>
                <input type="tel" v-model="formData.phone" class="form-input" />
              </div>
            </div>

            <div class="form-group full-width">
              <label>TC No</label>
              <input type="text" v-model="formData.tcNo" class="form-input" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Şifre</label>
                <input type="password" v-model="formData.password" class="form-input" />
              </div>
              <div class="form-group">
                <label>Şifre Tekrar</label>
                <input type="password" v-model="formData.passwordConfirm" class="form-input" />
              </div>
            </div>

            <div class="checkbox-group">
              <label>
                <input type="checkbox" v-model="formData.emailNotifications" />
                <span>E-Mail ile bilgilendirme almak istiyorum.</span>
              </label>
            </div>

            <div class="checkbox-group">
              <label>
                <input type="checkbox" v-model="formData.smsNotifications" />
                <span>Sms ile bilgilendirme almak istiyorum.</span>
              </label>
            </div>

            <div class="checkbox-group">
              <label>
                <input type="checkbox" v-model="formData.phoneNotifications" />
                <span>Telefon ile bilgilendirme almak istiyorum.</span>
              </label>
            </div>

            <div class="captcha-section">
              <div class="captcha-code">E4EMZ</div>
              <input
                type="text"
                v-model="formData.captcha"
                placeholder="Güvenlik Kodu"
                class="form-input captcha-input"
              />
            </div>

            <button type="submit" class="save-btn">Kaydet</button>
          </form>
        </div>

        <!-- Teslimat Adreslerim Tab -->
        <div v-if="activeTab === 'delivery'" class="form-section">
          <button class="add-new-btn" @click="showDeliveryModal = !showDeliveryModal">
            Yeni Adres Ekle
          </button>

          <table class="address-table">
            <thead>
              <tr>
                <th>Adres Tanımı</th>
                <th>Ülke</th>
                <th>İl</th>
                <th>Düzenle</th>
                <th>Sil</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="deliveryAddresses.length === 0">
                <td colspan="5" class="empty-message">Henüz kayıtlı adres bulunmamaktadır.</td>
              </tr>
              <tr v-for="address in deliveryAddresses" :key="address.id">
                <td>{{ address.name }}</td>
                <td>{{ address.country }}</td>
                <td>{{ address.city }}</td>
                <td><button class="action-btn edit-btn">Düzenle</button></td>
                <td><button class="action-btn delete-btn" @click="deleteAddress(address.id, 'delivery')">Sil</button></td>
              </tr>
            </tbody>
          </table>

          <!-- Add Address Form (Inline) -->
          <div v-if="showDeliveryModal" class="inline-form">
            <h3 class="inline-form-title">Yeni Adres Ekle</h3>
            <form @submit.prevent="handleAddAddress('delivery')" class="address-form">
              <div class="form-group">
                <label>Adres Tanımı</label>
                <input type="text" v-model="newAddress.name" class="form-input" />
              </div>

              <div class="form-group">
                <label>Posta Kodu</label>
                <input type="text" v-model="newAddress.postalCode" class="form-input" />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Ülke</label>
                  <select
                    v-model="newAddress.country"
                    @change="handleCountryChange"
                    class="form-input"
                  >
                    <option value="">- Seçim Yapınız -</option>
                    <option v-for="country in countries" :key="country.id" :value="country.name">
                      {{ country.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label>İl</label>
                  <select
                    v-model="newAddress.city"
                    @change="handleCityChange"
                    class="form-input"
                    :disabled="!newAddress.country"
                  >
                    <option value="">İl seçiniz</option>
                    <option v-for="city in availableCities" :key="city.id" :value="city.name">
                      {{ city.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label>İlçe</label>
                  <select
                    v-model="newAddress.district"
                    class="form-input"
                    :disabled="!newAddress.city"
                  >
                    <option value="">İlçe seçiniz</option>
                    <option
                      v-for="district in availableDistricts"
                      :key="district.id"
                      :value="district.name"
                    >
                      {{ district.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label>Adres</label>
                <textarea
                  v-model="newAddress.address"
                  class="form-input address-textarea"
                  rows="4"
                ></textarea>
              </div>

              <div class="captcha-section">
                <div class="captcha-code">VKNL4</div>
                <input
                  type="text"
                  v-model="newAddress.captcha"
                  placeholder="Güvenlik Kodu"
                  class="form-input captcha-input"
                />
              </div>

              <button type="submit" class="save-btn">Kaydet</button>
            </form>
          </div>
        </div>

        <!-- Fatura Adreslerim Tab -->
        <div v-if="activeTab === 'billing'" class="form-section">
          <button class="add-new-btn" @click="showBillingModal = !showBillingModal">
            Yeni Adres Ekle
          </button>

          <table class="address-table">
            <thead>
              <tr>
                <th>Adres Tanımı</th>
                <th>Ülke</th>
                <th>İl</th>
                <th>Düzenle</th>
                <th>Sil</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="billingAddresses.length === 0">
                <td colspan="5" class="empty-message">Henüz kayıtlı adres bulunmamaktadır.</td>
              </tr>
              <tr v-for="address in billingAddresses" :key="address.id">
                <td>{{ address.name }}</td>
                <td>{{ address.country }}</td>
                <td>{{ address.city }}</td>
                <td><button class="action-btn edit-btn">Düzenle</button></td>
                <td><button class="action-btn delete-btn" @click="deleteAddress(address.id, 'billing')">Sil</button></td>
              </tr>
            </tbody>
          </table>

          <!-- Add Address Form (Inline) -->
          <div v-if="showBillingModal" class="inline-form">
            <h3 class="inline-form-title">Yeni Adres Ekle</h3>
            <form @submit.prevent="handleAddAddress('billing')" class="address-form">
              <div class="form-group">
                <label>Adres Tanımı</label>
                <input type="text" v-model="newAddress.name" class="form-input" />
              </div>

              <div class="form-group">
                <label>Posta Kodu</label>
                <input type="text" v-model="newAddress.postalCode" class="form-input" />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Ülke</label>
                  <select
                    v-model="newAddress.country"
                    @change="handleCountryChange"
                    class="form-input"
                  >
                    <option value="">- Seçim Yapınız -</option>
                    <option v-for="country in countries" :key="country.id" :value="country.name">
                      {{ country.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label>İl</label>
                  <select
                    v-model="newAddress.city"
                    @change="handleCityChange"
                    class="form-input"
                    :disabled="!newAddress.country"
                  >
                    <option value="">İl seçiniz</option>
                    <option v-for="city in availableCities" :key="city.id" :value="city.name">
                      {{ city.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label>İlçe</label>
                  <select
                    v-model="newAddress.district"
                    class="form-input"
                    :disabled="!newAddress.city"
                  >
                    <option value="">İlçe seçiniz</option>
                    <option
                      v-for="district in availableDistricts"
                      :key="district.id"
                      :value="district.name"
                    >
                      {{ district.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label>Adres</label>
                <textarea
                  v-model="newAddress.address"
                  class="form-input address-textarea"
                  rows="4"
                ></textarea>
              </div>

              <div class="captcha-section">
                <div class="captcha-code">VKNL4</div>
                <input
                  type="text"
                  v-model="newAddress.captcha"
                  placeholder="Güvenlik Kodu"
                  class="form-input captcha-input"
                />
              </div>

              <button type="submit" class="save-btn">Kaydet</button>
            </form>
          </div>
        </div>

        <!-- Siparişlerim Tab -->
        <div v-if="activeTab === 'orders'" class="form-section">
          <table class="address-table">
            <thead>
              <tr>
                <th>Sipariş No</th>
                <th>Sipariş Tarihi</th>
                <th>Toplam</th>
                <th>Ödeme Tipi</th>
                <th>Durum</th>
                <th>İncele</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="orders.length === 0">
                <td colspan="6" class="empty-message">Henüz sipariş bulunmamaktadır.</td>
              </tr>
              <tr v-for="order in orders" :key="order.id">
                <td>{{ order.orderNo }}</td>
                <td>{{ order.orderDate }}</td>
                <td>{{ order.total }}</td>
                <td>{{ order.paymentType }}</td>
                <td>
                  <span :class="['status-badge', order.statusClass]">
                    {{ order.status }}
                  </span>
                </td>
                <td>
                  <button class="action-btn delete-btn" @click="cancelOrder(order.id)">İptal Et</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from "~/stores/auth"
import { useOrderStore } from "~/stores/order"
import { useRouter } from 'vue-router'
import { db, auth } from "~/composables/useFirebase"
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, updateDoc } from 'firebase/firestore'
import { updatePassword, updateProfile } from 'firebase/auth'
import type { Address } from "~/types"

const router = useRouter()
const authStore = useAuthStore()
const orderStore = useOrderStore()

const activeTab = ref('account')

const tabs = [
  { id: 'account', label: 'Hesabım' },
  { id: 'delivery', label: 'Teslimat Adreslerim' },
  { id: 'billing', label: 'Fatura Adreslerim' },
  { id: 'orders', label: 'Siparişlerim' }
]

onMounted(async () => {
  // Giriş kontrolü
  if (!authStore.isAuthenticated) {
    alert('Bu sayfayı görüntülemek için giriş yapmalısınız!')
    router.push('/sign-in')
    return
  }
  
  // Kullanıcı bilgilerini yükle
  if (authStore.user) {
    // Kullanıcı bilgilerini forma doldur
    const displayName = authStore.user.displayName || ''
    const nameParts = displayName.split(' ')
    
    formData.value = {
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      email: authStore.user.email || '',
      phone: '',
      tcNo: '',
      password: '••••••••••',
      passwordConfirm: '',
      emailNotifications: false,
      smsNotifications: false,
      phoneNotifications: false,
      captcha: ''
    }
    
    // Kullanıcının siparişlerini yükle
    await orderStore.fetchUserOrders(authStore.user.id)
    
    // Adresleri yükle
    await loadAddresses()
  }
})

// Mock data for countries
const countries = [
  { id: 1, name: 'Türkiye' },
  { id: 2, name: 'Almanya' },
  { id: 3, name: 'Fransa' },
  { id: 4, name: 'İngiltere' },
  { id: 5, name: 'Amerika Birleşik Devletleri' }
]

// Mock data for cities by country
const citiesByCountry = {
  Türkiye: [
    { id: 1, name: 'İstanbul' },
    { id: 2, name: 'Ankara' },
    { id: 3, name: 'İzmir' },
    { id: 4, name: 'Antalya' },
    { id: 5, name: 'Bursa' },
    { id: 6, name: 'Adana' },
    { id: 7, name: 'Gaziantep' },
    { id: 8, name: 'Konya' }
  ],
  Almanya: [
    { id: 1, name: 'Berlin' },
    { id: 2, name: 'München' },
    { id: 3, name: 'Hamburg' },
    { id: 4, name: 'Frankfurt' }
  ],
  Fransa: [
    { id: 1, name: 'Paris' },
    { id: 2, name: 'Lyon' },
    { id: 3, name: 'Marsilya' },
    { id: 4, name: 'Nice' }
  ],
  İngiltere: [
    { id: 1, name: 'Londra' },
    { id: 2, name: 'Manchester' },
    { id: 3, name: 'Birmingham' },
    { id: 4, name: 'Liverpool' }
  ],
  'Amerika Birleşik Devletleri': [
    { id: 1, name: 'New York' },
    { id: 2, name: 'Los Angeles' },
    { id: 3, name: 'Chicago' },
    { id: 4, name: 'Houston' }
  ]
}

// Mock data for districts by city
const districtsByCity = {
  İstanbul: [
    { id: 1, name: 'Kadıköy' },
    { id: 2, name: 'Beşiktaş' },
    { id: 3, name: 'Şişli' },
    { id: 4, name: 'Üsküdar' },
    { id: 5, name: 'Beyoğlu' },
    { id: 6, name: 'Sarıyer' },
    { id: 7, name: 'Bakırköy' },
    { id: 8, name: 'Ataşehir' }
  ],
  Ankara: [
    { id: 1, name: 'Çankaya' },
    { id: 2, name: 'Keçiören' },
    { id: 3, name: 'Yenimahalle' },
    { id: 4, name: 'Mamak' },
    { id: 5, name: 'Etimesgut' }
  ],
  İzmir: [
    { id: 1, name: 'Konak' },
    { id: 2, name: 'Karşıyaka' },
    { id: 3, name: 'Bornova' },
    { id: 4, name: 'Buca' },
    { id: 5, name: 'Çiğli' }
  ],
  Antalya: [
    { id: 1, name: 'Muratpaşa' },
    { id: 2, name: 'Kepez' },
    { id: 3, name: 'Konyaaltı' },
    { id: 4, name: 'Alanya' }
  ],
  Bursa: [
    { id: 1, name: 'Osmangazi' },
    { id: 2, name: 'Nilüfer' },
    { id: 3, name: 'Yıldırım' },
    { id: 4, name: 'Gemlik' }
  ],
  Berlin: [
    { id: 1, name: 'Mitte' },
    { id: 2, name: 'Kreuzberg' },
    { id: 3, name: 'Charlottenburg' }
  ],
  Paris: [
    { id: 1, name: '1er arrondissement' },
    { id: 2, name: '8e arrondissement' },
    { id: 3, name: '16e arrondissement' }
  ],
  Londra: [
    { id: 1, name: 'Westminster' },
    { id: 2, name: 'Camden' },
    { id: 3, name: 'Kensington' }
  ]
}

// Computed properties for available cities and districts
const availableCities = computed(() => {
  if (!newAddress.value.country) return []
  return citiesByCountry[newAddress.value.country] || []
})

const availableDistricts = computed(() => {
  if (!newAddress.value.city) return []
  return districtsByCity[newAddress.value.city] || []
})

// Computed property for current tab label
const currentTabLabel = computed(() => {
  const currentTab = tabs.find((tab) => tab.id === activeTab.value)
  return currentTab ? currentTab.label : 'Hesabım'
})

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  tcNo: '',
  password: '••••••••••',
  passwordConfirm: '',
  emailNotifications: false,
  smsNotifications: false,
  phoneNotifications: false,
  captcha: ''
})

const deliveryAddresses = ref<Address[]>([])
const billingAddresses = ref<Address[]>([])

const showDeliveryModal = ref(false)
const showBillingModal = ref(false)

// Siparişleri orderStore'dan al
const orders = computed(() => {
  return orderStore.orders.map(order => ({
    id: order.id,
    orderNo: order.id,
    orderDate: new Date(order.createdAt).toLocaleDateString('tr-TR'),
    total: `₺${order.totalAmount.toFixed(2)}`,
    paymentType: order.paymentMethod || 'Kredi Kartı',
    status: getStatusText(order.status),
    statusClass: getStatusClass(order.status)
  }))
})

// Sipariş durumunu Türkçe'ye çevir
const getStatusText = (status: string) => {
  const statusMap: { [key: string]: string } = {
    'PENDING': 'Onay Bekliyor',
    'CONFIRMED': 'Onaylandı',
    'PROCESSING': 'Hazırlanıyor',
    'SHIPPED': 'Kargoda',
    'DELIVERED': 'Teslim Edildi',
    'CANCELLED': 'İptal Edildi'
  }
  return statusMap[status] || status
}

// Sipariş durumuna göre CSS class
const getStatusClass = (status: string) => {
  const classMap: { [key: string]: string } = {
    'PENDING': 'status-pending',
    'CONFIRMED': 'status-confirmed',
    'PROCESSING': 'status-preparing',
    'SHIPPED': 'status-shipping',
    'DELIVERED': 'status-delivered',
    'CANCELLED': 'status-cancelled'
  }
  return classMap[status] || 'status-pending'
}

const newAddress = ref({
  name: '',
  postalCode: '',
  country: '',
  city: '',
  district: '',
  address: '',
  captcha: ''
})

const handleSave = async () => {
  if (!authStore.user || !auth.currentUser) {
    alert('Bilgileri güncellemek için giriş yapmalısınız!')
    return
  }

  try {
    console.log('💾 Kullanıcı bilgileri güncelleniyor...')
    
    // Şifre kontrolü
    if (formData.value.password && formData.value.password !== '••••••••••') {
      if (formData.value.password !== formData.value.passwordConfirm) {
        alert('Şifreler eşleşmiyor!')
        return
      }
      
      if (formData.value.password.length < 6) {
        alert('Şifre en az 6 karakter olmalıdır!')
        return
      }
      
      // Firebase Auth'da şifreyi güncelle
      console.log('🔐 Şifre güncelleniyor...')
      await updatePassword(auth.currentUser, formData.value.password)
      console.log('✅ Şifre güncellendi')
    }
    
    // DisplayName güncelle
    const newDisplayName = `${formData.value.firstName} ${formData.value.lastName}`.trim()
    if (newDisplayName && newDisplayName !== authStore.user.displayName) {
      console.log('👤 DisplayName güncelleniyor:', newDisplayName)
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName
      })
      console.log('✅ DisplayName güncellendi')
    }
    
    // Firestore'da kullanıcı bilgilerini güncelle
    const userRef = doc(db, 'users', authStore.user.id)
    await updateDoc(userRef, {
      displayName: newDisplayName,
      email: formData.value.email,
      phoneNumber: formData.value.phone,
      updatedAt: new Date()
    })
    console.log('✅ Firestore kullanıcı bilgileri güncellendi')
    
    // AuthStore'u güncelle
    if (authStore.user) {
      authStore.user.displayName = newDisplayName
      authStore.user.email = formData.value.email
    }
    
    // Şifre alanlarını temizle
    formData.value.password = '••••••••••'
    formData.value.passwordConfirm = ''
    
    alert('Bilgileriniz başarıyla güncellendi!')
  } catch (error: any) {
    console.error('❌ Güncelleme hatası:', error)
    
    // Firebase hata mesajlarını Türkçeye çevir
    let errorMessage = 'Bilgiler güncellenirken bir hata oluştu!'
    
    if (error.code === 'auth/requires-recent-login') {
      errorMessage = 'Şifre güncellemek için yeniden giriş yapmalısınız!'
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Şifre çok zayıf!'
    }
    
    alert(errorMessage)
  }
}

const handleCountryChange = () => {
  // Reset city and district when country changes
  newAddress.value.city = ''
  newAddress.value.district = ''
}

const handleCityChange = () => {
  // Reset district when city changes
  newAddress.value.district = ''
}

const handleAddAddress = async (type: 'delivery' | 'billing') => {
  if (!authStore.user) {
    alert('Adres eklemek için giriş yapmalısınız!')
    return
  }

  try {
    console.log(`🏠 ${type} adresi ekleniyor...`)
    
    const addressData: Omit<Address, 'id'> = {
      userId: authStore.user.id,
      type: type,
      name: newAddress.value.name,
      postalCode: newAddress.value.postalCode,
      country: newAddress.value.country,
      city: newAddress.value.city,
      district: newAddress.value.district,
      address: newAddress.value.address,
      createdAt: new Date()
    }

    const docRef = await addDoc(collection(db, 'addresses'), addressData)
    console.log('✅ Adres eklendi:', docRef.id)

    // Local state'i güncelle
    const newAddressWithId: Address = {
      id: docRef.id,
      ...addressData
    }

    if (type === 'delivery') {
      deliveryAddresses.value.push(newAddressWithId)
      showDeliveryModal.value = false
      
      // Teslimat adresi eklendiğinde aynısını fatura adresi olarak da ekle
      console.log('📋 Aynı adres fatura adresi olarak da ekleniyor...')
      const billingAddressData: Omit<Address, 'id'> = {
        ...addressData,
        type: 'billing'
      }
      
      const billingDocRef = await addDoc(collection(db, 'addresses'), billingAddressData)
      console.log('✅ Fatura adresi de eklendi:', billingDocRef.id)
      
      billingAddresses.value.push({
        id: billingDocRef.id,
        ...billingAddressData
      })
      
    } else if (type === 'billing') {
      billingAddresses.value.push(newAddressWithId)
      showBillingModal.value = false
    }

    // Formu temizle
    newAddress.value = {
      name: '',
      postalCode: '',
      country: '',
      city: '',
      district: '',
      address: '',
      captcha: ''
    }

    alert(type === 'delivery' 
      ? 'Teslimat adresi eklendi ve fatura adresi olarak da kaydedildi!' 
      : 'Fatura adresi başarıyla eklendi!')
  } catch (error) {
    console.error('❌ Adres ekleme hatası:', error)
    alert('Adres eklenirken bir hata oluştu!')
  }
}

const loadAddresses = async () => {
  if (!authStore.user) return

  try {
    console.log('📦 Adresler yükleniyor...')
    
    const q = query(
      collection(db, 'addresses'),
      where('userId', '==', authStore.user.id)
    )
    const querySnapshot = await getDocs(q)

    const deliveryList: Address[] = []
    const billingList: Address[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Address, 'id'>
      const address: Address = {
        id: doc.id,
        ...data
      }

      if (address.type === 'delivery') {
        deliveryList.push(address)
      } else if (address.type === 'billing') {
        billingList.push(address)
      }
    })

    deliveryAddresses.value = deliveryList
    billingAddresses.value = billingList
    
    console.log('✅ Adresler yüklendi - Teslimat:', deliveryList.length, 'Fatura:', billingList.length)
  } catch (error) {
    console.error('❌ Adresler yüklenirken hata:', error)
  }
}

const deleteAddress = async (addressId: string, type: 'delivery' | 'billing') => {
  if (!confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
    return
  }

  try {
    console.log('🗑️ Adres siliniyor:', addressId)
    
    await deleteDoc(doc(db, 'addresses', addressId))
    
    // Local state'ten sil
    if (type === 'delivery') {
      deliveryAddresses.value = deliveryAddresses.value.filter(a => a.id !== addressId)
    } else {
      billingAddresses.value = billingAddresses.value.filter(a => a.id !== addressId)
    }
    
    console.log('✅ Adres silindi')
    alert('Adres başarıyla silindi!')
  } catch (error) {
    console.error('❌ Adres silme hatası:', error)
    alert('Adres silinirken bir hata oluştu!')
  }
}

const cancelOrder = async (orderId: string) => {
  if (!confirm('Bu siparişi iptal etmek istediğinizden emin misiniz?')) {
    return
  }

  try {
    console.log('🚫 Sipariş iptal ediliyor:', orderId)
    
    await deleteDoc(doc(db, 'orders', orderId))
    
    // OrderStore'dan da kaldır
    await orderStore.fetchUserOrders(authStore.user!.id)
    
    console.log('✅ Sipariş iptal edildi')
    alert('Sipariş başarıyla iptal edildi!')
  } catch (error) {
    console.error('❌ Sipariş iptal hatası:', error)
    alert('Sipariş iptal edilirken bir hata oluştu!')
  }
}
</script>

<style scoped>
.account-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 20px;
  background: white;
}

.account-title {
  font-size: 48px;
  font-weight: 300;
  text-align: center;
  margin: 0 0 60px 0;
  color: #333;
}

.account-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 60px;
}

.account-sidebar {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tab-btn {
  padding: 15px 25px;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  background: white;
  font-size: 15px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.tab-btn:hover {
  border-color: #999;
}

.tab-btn.active {
  background: #000;
  color: white;
  border-color: #000;
}

.account-main {
  background: white;
}

.form-section {
  width: 100%;
}

.account-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 14px;
  color: #333;
  font-weight: 400;
}

.form-input {
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  background: #f9f9f9;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #999;
  background: white;
}

.checkbox-group {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

.checkbox-group input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.captcha-section {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
}

.captcha-code {
  background: #e8e8e8;
  padding: 12px 30px;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #333;
}

.captcha-input {
  flex: 1;
  max-width: 300px;
}

.save-btn {
  background: #000;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 14px 40px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  align-self: flex-start;
  margin-top: 20px;
}

.save-btn:hover {
  background: #333;
}

.placeholder-text {
  font-size: 16px;
  color: #666;
  text-align: center;
  padding: 40px;
}

.add-new-btn {
  background: #000;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 30px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 30px;
}

.add-new-btn:hover {
  background: #333;
}

.address-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.address-table thead {
  background: white;
  border-bottom: 2px solid #e0e0e0;
}

.address-table th {
  padding: 15px;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.address-table tbody tr {
  border-bottom: 1px solid #e0e0e0;
}

.address-table tbody tr:hover {
  background: #f9f9f9;
}

.address-table td {
  padding: 15px;
  font-size: 14px;
  color: #666;
}

.empty-message {
  text-align: center;
  color: #999;
  padding: 40px !important;
}

.action-btn {
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
}

.edit-btn {
  background: #f0f0f0;
  color: #333;
}

.edit-btn:hover {
  background: #e0e0e0;
}

.delete-btn {
  background: #f0f0f0;
  color: #333;
}

.delete-btn:hover {
  background: #ffebee;
  color: #d32f2f;
}

@media (max-width: 968px) {
  .account-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .account-sidebar {
    flex-direction: row;
    overflow-x: auto;
  }

  .tab-btn {
    white-space: nowrap;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .captcha-section {
    flex-direction: column;
    align-items: stretch;
  }

  .captcha-input {
    max-width: 100%;
  }

  .address-table {
    display: block;
    overflow-x: auto;
  }
}

.inline-form {
  margin-top: 30px;
  padding: 30px 0;
  background: white;
}

.inline-form-title {
  font-size: 24px;
  font-weight: 400;
  margin: 0 0 25px 0;
  color: #333;
}

.address-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.address-textarea {
  resize: vertical;
  min-height: 100px;
}

select.form-input {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}

select.form-input:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  background-color: #f0f0f0;
}

.status-badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
}

.status-delivered {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-shipping {
  background: #e3f2fd;
  color: #1565c0;
}

.status-preparing {
  background: #fff3e0;
  color: #ef6c00;
}

.status-pending {
  background: #fce4ec;
  color: #c2185b;
}
</style>
