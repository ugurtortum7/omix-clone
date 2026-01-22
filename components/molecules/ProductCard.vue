<template>
  <div class="product-card" @click="handleClick">
    <div class="product-card-image">
      <BaseImage :src="image" :alt="name" rounded />
    </div>
    <div class="product-card-content">
      <BaseHeading level="h3" class="product-name">{{ name }}</BaseHeading>
      <p v-if="price" class="product-price">{{ formatPrice(price) }}</p>
      <BaseButton v-if="showButton" variant="primary" size="small" @click.stop="handleButtonClick">
        {{ buttonText }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseImage from '../atoms/BaseImage.vue'
import BaseHeading from '../atoms/BaseHeading.vue'
import BaseButton from '../atoms/BaseButton.vue'

defineProps({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: null
  },
  showButton: {
    type: Boolean,
    default: false
  },
  buttonText: {
    type: String,
    default: 'Satın Al'
  }
})

const emit = defineEmits(['click', 'button-click'])

const handleClick = () => {
  emit('click')
}

const handleButtonClick = () => {
  emit('button-click')
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(price)
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-card-image {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: #f5f5f5;
}

.product-card-content {
  padding: 16px;
}

.product-name {
  margin-bottom: 8px;
  font-size: 18px;
}

.product-price {
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 600;
  color: #000;
}
</style>
