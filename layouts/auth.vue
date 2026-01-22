<template>
  <div class="auth-layout">
    <SiteHeader />
    <main class="main-content">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

.auth-container {
  width: 100%;
  max-width: 500px;
}

.auth-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
}
</style>
