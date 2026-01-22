<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="viewBox"
    :fill="fill"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    :class="['base-icon', { clickable: clickable }]"
    @click="handleClick"
  >
    <slot />
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 24
  },
  viewBox: {
    type: String,
    default: '0 0 24 24'
  },
  fill: {
    type: String,
    default: 'none'
  },
  stroke: {
    type: String,
    default: 'currentColor'
  },
  strokeWidth: {
    type: [String, Number],
    default: 2
  },
  clickable: {
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
.base-icon {
  display: inline-block;
  vertical-align: middle;
}

.base-icon.clickable {
  cursor: pointer;
}

.base-icon.clickable:hover {
  opacity: 0.7;
}
</style>
