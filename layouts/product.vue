<template>
  <div class="product-layout">
    <SiteHeader />
    <main class="product-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.product-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: white;
}

.product-main {
  flex: 1;
}
</style>
