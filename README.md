# OMIX E-Commerce Platform

> Modern e-ticaret platformu - Nuxt 3, Firebase, Pinia ve TypeScript ile geliştirildi

## 🚀 Teknoloji Stack

- **Framework:** Nuxt 3.20.2
- **Frontend:** Vue 3.5.27 (Composition API)
- **State Management:** Pinia 2.3.0
- **Backend:** Firebase 12.8.0 (Firestore + Authentication)
- **Language:** TypeScript 5.9.0
- **Styling:** CSS3 with CSS Variables
- **Build Tool:** Vite 7.3.1 (via Nuxt)

## 📋 Proje Gereksinimleri

✅ Firebase Firestore kullanımı (4+ koleksiyon)  
✅ Nuxt 3 framework  
✅ Pinia state management (4+ store)  
✅ Vue Router (Nuxt auto-routing)  
✅ 2+ Layout yapısı  
✅ TypeScript (6 interface)  
✅ Atomic Design Pattern

## 🗂️ Proje Yapısı

```
omix-clone/
├── assets/                 # Global CSS ve stil dosyaları
├── components/            # Atomic Design bileşenleri
│   ├── atoms/            # Temel bileşenler (Button, Input, vb.)
│   ├── molecules/        # Birleşik bileşenler (FormField, CartItem)
│   └── organisms/        # Karmaşık bileşenler (Header, BasketCart)
├── composables/          # Nuxt composables (Firebase)
├── layouts/              # Layout bileşenleri (main, auth, product)
├── pages/                # Nuxt sayfalar (auto-routing)
├── stores/               # Pinia state stores
├── types/                # TypeScript type definitions
├── public/               # Statik dosyalar
├── app.vue              # Nuxt root component
└── nuxt.config.ts       # Nuxt configuration
```

## 🔥 Firebase Koleksiyonları

1. **users** - Kullanıcı profilleri
2. **baskets** - Alışveriş sepetleri
3. **orders** - Siparişler
4. **addresses** - Teslimat ve fatura adresleri

## 🏪 Pinia Stores

1. **auth** - Kimlik doğrulama ve kullanıcı yönetimi
2. **basket** - Sepet işlemleri
3. **order** - Sipariş yönetimi
4. **product** - Ürün verileri

## 📐 TypeScript Interfaces

1. **Product** - Ürün bilgileri
2. **User** - Kullanıcı profili
3. **BasketItem** & **Basket** - Sepet öğeleri
4. **Order** & **OrderStatus** - Sipariş bilgileri
5. **Address** - Adres bilgileri

## 🎨 Layout Yapısı

- **main** - Ana sayfa layoutu (Header + Footer)
- **auth** - Kimlik doğrulama sayfaları (Header + Footer)
- **product** - Ürün detay sayfası

## 🚦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm run dev

# Production build
npm run build

# Production preview
npm run preview
```

## 🔐 Firebase Kurulumu

1. `.env` dosyası oluşturun:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

2. Firebase Console'da Firestore ve Authentication'ı etkinleştirin

## 📋 Git Commit Planı

### **Commit 1: Initial Nuxt 3 setup and configuration**
```bash
git add nuxt.config.ts package.json package-lock.json tsconfig.json
git add -u tsconfig.app.json tsconfig.node.json vite.config.ts index.html env.d.ts
git commit -m "feat: migrate from Vite to Nuxt 3"
```

### **Commit 2: Add Nuxt app root and layouts**
```bash
git add app.vue layouts/
git commit -m "feat: add Nuxt app root and layout system"
```

### **Commit 3: Setup Firebase configuration**
```bash
git add composables/useFirebase.ts .env
git commit -m "feat: setup Firebase composable for Nuxt"
```

### **Commit 4: Add TypeScript type definitions**
```bash
git add types/
git commit -m "feat: add TypeScript interfaces and types"
```

### **Commit 5: Setup Pinia stores**
```bash
git add stores/
git commit -m "feat: implement Pinia stores for state management"
```

### **Commit 6: Add atomic components**
```bash
git add components/atoms/
git commit -m "feat: add atomic design - atoms layer"
```

### **Commit 7: Add molecular components**
```bash
git add components/molecules/
git commit -m "feat: add atomic design - molecules layer"
```

### **Commit 8: Add organism components - Part 1**
```bash
git add components/organisms/SignInForm.vue
git add components/organisms/RegisterForm.vue
git add components/organisms/SiteHeader.vue
git add components/organisms/SiteFooter.vue
git commit -m "feat: add authentication and navigation organisms"
```

### **Commit 9: Add organism components - Part 2**
```bash
git add components/organisms/ImageCarousel.vue
git add components/organisms/ProductDetail.vue
git add components/organisms/BasketCart.vue
git add components/organisms/PurchaseForm.vue
git add components/organisms/TechFeatures.vue
git commit -m "feat: add e-commerce organism components"
```

### **Commit 10: Add MyAccount organism**
```bash
git add components/organisms/MyAccount.vue
git commit -m "feat: add user account management component"
```

### **Commit 11: Add Nuxt pages**
```bash
git add pages/
git commit -m "feat: create Nuxt pages with auto-routing"
```

### **Commit 12: Add template components and assets**
```bash
git add components/templates/ assets/
git commit -m "feat: add template components and global styles"
```

### **Commit 13: Add documentation**
```bash
git add FIREBASE_SETUP.md PROJE_OZETI.md
git commit -m "docs: add project documentation"
```

### **Commit 14: Update legacy src files**
```bash
git add src/
git commit -m "chore: update legacy src directory files"
```

## 🌟 Özellikler

### Kullanıcı Yönetimi
- ✅ Kayıt olma (email/password)
- ✅ Giriş yapma
- ✅ Profil güncelleme
- ✅ Şifre değiştirme
- ✅ Çıkış yapma

### E-Ticaret
- ✅ Ürün listeleme
- ✅ Sepete ekleme/çıkarma
- ✅ Sepet yönetimi
- ✅ Sipariş oluşturma
- ✅ Sipariş geçmişi
- ✅ Sipariş iptal etme

### Adres Yönetimi
- ✅ Teslimat adresi ekleme/düzenleme
- ✅ Fatura adresi ekleme/düzenleme
- ✅ Adres silme

## 🎯 Sayfalar

- `/` - Ana sayfa (Carousel + Ürün Detayı)
- `/sign-in` - Giriş yap
- `/register` - Kayıt ol
- `/basket` - Sepetim
- `/my-account` - Hesabım
- `/product` - Ürün detayı
- `/purchase` - Satın alma
- `/tech-features` - Teknik özellikler

## 📱 Responsive Design

Tüm sayfalar mobil uyumludur ve farklı ekran boyutları için optimize edilmiştir.

## 🔒 Güvenlik

- Firebase Authentication ile güvenli kimlik doğrulama
- Firestore Security Rules ile veri güvenliği
- Client-side form validasyonu
- CAPTCHA koruması

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

---

**Developed with ❤️ using Nuxt 3 & Firebase**
