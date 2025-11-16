import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import HeaderPage from '@/views/HeaderPage.vue'
import FooterPage from '@/views/FooterPage.vue'
import SignInPage from '@/views/SignInPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import ProductPage from '@/views/ProductPage.vue'
import TechFeaturesPage from '@/views/TechFeaturesPage.vue'
import PurchasePage from '@/views/PurchasePage.vue'
import MyAccountPage from '@/views/MyAccountPage.vue'
import BasketPage from '@/views/BasketPage.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'HomePage', component: HomePage },
    { path: '/header', name: 'HeaderPage', component: HeaderPage },
    { path: '/footer', name: 'FooterPage', component: FooterPage },
    { path: '/sign-in', name: 'SignInPage', component: SignInPage },
    { path: '/register', name: 'RegisterPage', component: RegisterPage },
    { path: '/product', name: 'ProductPage', component: ProductPage },
    { path: '/tech-features', name: 'TechFeaturesPage', component: TechFeaturesPage },
    { path: '/purchase', name: 'PurchasePage', component: PurchasePage },
    { path: '/my-account', name: 'MyAccountPage', component: MyAccountPage },
    { path: '/basket', name: 'BasketPage', component: BasketPage },
    { path: '/carousel', name: 'ImageCarousel', component: ImageCarousel },
  ],
})

export default router