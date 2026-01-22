<template>
  <div class="product-layout">
    <div class="product-layout-container">
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.product-layout {
  min-height: 100vh;
  padding: 40px 20px;
  background: #f9f9f9;
}

.product-layout-container {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
