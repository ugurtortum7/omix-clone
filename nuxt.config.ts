// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  // SSR (Server-Side Rendering) aktif - SEO ve performans için
  ssr: true,
  
  modules: [
    '@pinia/nuxt'
  ],

  components: [
    {
      path: '~/components/atoms',
      pathPrefix: false
    },
    {
      path: '~/components/molecules',
      pathPrefix: false
    },
    {
      path: '~/components/organisms',
      pathPrefix: false
    }
  ],

  typescript: {
    strict: true,
    typeCheck: false  // vite-plugin-checker sorunu nedeniyle şimdilik kapalı
  },

  css: ['~/assets/main.css'],

  vite: {
    vue: {
      script: {
        propsDestructure: true
      }
    }
  },

  app: {
    head: {
      title: 'OMIX',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'OMIX e-commerce website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      localApiBase: process.env.NUXT_PUBLIC_LOCAL_API_BASE || 'http://localhost:4000',
      useLocalApi: process.env.NUXT_PUBLIC_USE_LOCAL_API || 'false'
    }
  }
})
