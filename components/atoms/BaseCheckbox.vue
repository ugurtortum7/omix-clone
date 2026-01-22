<template>
  <input
    type="checkbox"
    :checked="modelValue"
    :disabled="disabled"
    :class="['base-checkbox', { disabled: disabled }]"
    @change="handleChange"
  />
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const handleChange = (event) => {
  emit('update:modelValue', event.target.checked)
}
</script>

<style scoped>
.base-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #000;
}

.base-checkbox.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
