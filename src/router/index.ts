import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import HeaderPage from '@/views/HeaderPage.vue'
import FooterPage from '@/views/FooterPage.vue'
import SignInPage from '@/views/SignInPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'HomePage', component: HomePage },
    { path: '/header', name: 'HeaderPage', component: HeaderPage },
    { path: '/footer', name: 'FooterPage', component: FooterPage },
    { path: '/sign-in', name: 'SignInPage', component: SignInPage },
  ],
})

export default router