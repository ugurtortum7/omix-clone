import { createMemoryHistory, createRouter } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'HomePage', component: HomePage },
  ],
})

export default router