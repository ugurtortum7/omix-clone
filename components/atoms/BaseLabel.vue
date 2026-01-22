<template>
  <label :for="htmlFor" :class="['base-label', { required: required }]">
    <slot />
  </label>
</template>

<script setup>
defineProps({
  htmlFor: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.base-label {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.base-label.required::after {
  content: ' *';
  color: #ff4444;
}
</style>
