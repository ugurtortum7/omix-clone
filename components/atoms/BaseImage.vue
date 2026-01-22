<template>
  <img
    :src="src"
    :alt="alt"
    :loading="loading"
    :class="['base-image', { rounded: rounded, circle: circle }]"
    @error="handleError"
    @load="handleLoad"
  />
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  loading: {
    type: String,
    default: 'lazy',
    validator: (value) => ['lazy', 'eager'].includes(value)
  },
  rounded: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['error', 'load'])

const handleError = (event) => {
  emit('error', event)
}

const handleLoad = (event) => {
  emit('load', event)
}
</script>

<style scoped>
.base-image {
  display: block;
  max-width: 100%;
  height: auto;
}

.base-image.rounded {
  border-radius: 8px;
}

.base-image.circle {
  border-radius: 50%;
  object-fit: cover;
}
</style>
