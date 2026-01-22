<template>
  <div class="nav-item" :class="{ 'has-dropdown': hasDropdown }" @mouseenter="showDropdown" @mouseleave="hideDropdown">
    <a :href="href" class="nav-link">{{ label }}</a>
    <div v-if="hasDropdown && isDropdownVisible" class="dropdown-menu">
      <slot name="dropdown" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  label: {
    type: String,
    required: true
  },
  href: {
    type: String,
    default: '#'
  },
  hasDropdown: {
    type: Boolean,
    default: false
  }
})

const isDropdownVisible = ref(false)

const showDropdown = () => {
  if (hasDropdown) {
    isDropdownVisible.value = true
  }
}

const hideDropdown = () => {
  isDropdownVisible.value = false
}
</script>

<style scoped>
.nav-item {
  position: relative;
}

.nav-link {
  display: block;
  padding: 12px 20px;
  color: #000;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #666;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 8px 0;
}
</style>
