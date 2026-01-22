<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="auth-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  padding: 20px;
}

.auth-container {
  width: 100%;
  max-width: 500px;
}

.auth-content {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
