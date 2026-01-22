<template>
  <button :type="type" :class="['base-button', variant, size, { disabled: disabled }]" :disabled="disabled" @click="handleClick">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'text'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  emit('click', event)
}
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
}

/* Sizes */
.small {
  padding: 8px 16px;
  font-size: 14px;
}

.medium {
  padding: 12px 24px;
  font-size: 16px;
}

.large {
  padding: 16px 32px;
  font-size: 18px;
}

/* Variants */
.primary {
  background-color: #000;
  color: white;
}

.primary:hover:not(.disabled) {
  background-color: #333;
}

.secondary {
  background-color: #f0f0f0;
  color: #000;
}

.secondary:hover:not(.disabled) {
  background-color: #e0e0e0;
}

.outline {
  background-color: transparent;
  color: #000;
  border: 2px solid #000;
}

.outline:hover:not(.disabled) {
  background-color: #000;
  color: white;
}

.text {
  background-color: transparent;
  color: #000;
  padding: 8px 16px;
}

.text:hover:not(.disabled) {
  background-color: rgba(0, 0, 0, 0.05);
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
