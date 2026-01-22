<template>
  <div class="main-layout">
    <SiteHeader />
    <main class="main-content">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import SiteHeader from '../organisms/SiteHeader.vue'
import SiteFooter from '../organisms/SiteFooter.vue'
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
