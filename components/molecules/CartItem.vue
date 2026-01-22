<template>
  <div class="cart-item">
    <div class="cart-item-image">
      <BaseImage :src="image" :alt="name" rounded />
    </div>
    <div class="cart-item-content">
      <BaseHeading level="h4" class="item-name">{{ name }}</BaseHeading>
      <p class="item-price">{{ formatPrice(price) }}</p>
    </div>
    <div class="cart-item-quantity">
      <BaseInput
        type="number"
        :model-value="quantity"
        :min="1"
        @update:model-value="$emit('update:quantity', $event)"
      />
    </div>
    <div class="cart-item-total">
      <p class="total-price">{{ formatPrice(price * quantity) }}</p>
    </div>
    <div class="cart-item-actions">
      <BaseButton variant="text" size="small" @click="$emit('remove')">
        <BaseIcon :size="20" clickable>
          <path d="M6 18L18 6M6 6l12 12" />
        </BaseIcon>
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseImage from '../atoms/BaseImage.vue'
import BaseHeading from '../atoms/BaseHeading.vue'
import BaseInput from '../atoms/BaseInput.vue'
import BaseButton from '../atoms/BaseButton.vue'
import BaseIcon from '../atoms/BaseIcon.vue'

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
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
})

defineEmits(['update:quantity', 'remove'])

const formatPrice = (price) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(price)
}
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  margin-bottom: 12px;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.cart-item-content {
  flex: 1;
}

.item-name {
  font-size: 16px;
  margin-bottom: 4px;
}

.item-price {
  color: #666;
  font-size: 14px;
}

.cart-item-quantity {
  width: 80px;
}

.cart-item-total {
  width: 100px;
  text-align: right;
}

.total-price {
  font-size: 18px;
  font-weight: 600;
}

.cart-item-actions {
  flex-shrink: 0;
}
</style>
