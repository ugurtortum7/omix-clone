<template>
  <div :class="['form-group', { error: error }]">
    <BaseLabel v-if="label" :html-for="id" :required="required">{{ label }}</BaseLabel>
    <BaseInput
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :model-value="modelValue"
      :disabled="disabled"
      :required="required"
      :error="error"
      :min="min"
      :max="max"
      @update:model-value="$emit('update:modelValue', $event)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import BaseLabel from '../atoms/BaseLabel.vue'
import BaseInput from '../atoms/BaseInput.vue'

defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  min: {
    type: [String, Number],
    default: undefined
  },
  max: {
    type: [String, Number],
    default: undefined
  }
})

defineEmits(['update:modelValue', 'blur', 'focus'])
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

.error-message {
  display: block;
  margin-top: 6px;
  font-size: 14px;
  color: #ff4444;
}
</style>
