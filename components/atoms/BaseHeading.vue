<template>
  <component :is="level" :class="['base-heading', `level-${level}`]">
    <slot />
  </component>
</template>

<script setup>
defineProps({
  level: {
    type: String,
    default: 'h2',
    validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
  }
})
</script>

<style scoped>
.base-heading {
  margin: 0;
  color: #000;
  font-weight: 600;
}

.level-h1 {
  font-size: 36px;
  line-height: 1.2;
}

.level-h2 {
  font-size: 30px;
  line-height: 1.3;
}

.level-h3 {
  font-size: 24px;
  line-height: 1.4;
}

.level-h4 {
  font-size: 20px;
  line-height: 1.4;
}

.level-h5 {
  font-size: 18px;
  line-height: 1.5;
}

.level-h6 {
  font-size: 16px;
  line-height: 1.5;
}
</style>
