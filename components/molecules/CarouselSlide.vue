<template>
  <div class="carousel-slide">
    <BaseButton variant="text" class="carousel-control prev" @click="$emit('prev')">
      <BaseIcon :size="32" clickable>
        <path d="M15 18l-6-6 6-6" />
      </BaseIcon>
    </BaseButton>
    
    <div class="carousel-image-container">
      <transition :name="transitionName">
        <BaseImage
          :key="currentIndex"
          :src="images[currentIndex]"
          :alt="`Slide ${currentIndex + 1}`"
          class="carousel-image"
        />
      </transition>
    </div>
    
    <BaseButton variant="text" class="carousel-control next" @click="$emit('next')">
      <BaseIcon :size="32" clickable>
        <path d="M9 18l6-6-6-6" />
      </BaseIcon>
    </BaseButton>
    
    <div class="carousel-indicators">
      <button
        v-for="(image, index) in images"
        :key="index"
        :class="['indicator-dot', { active: currentIndex === index }]"
        @click="$emit('goto', index)"
      />
    </div>
  </div>
</template>

<script setup>
import BaseImage from '../atoms/BaseImage.vue'
import BaseButton from '../atoms/BaseButton.vue'
import BaseIcon from '../atoms/BaseIcon.vue'

defineProps({
  images: {
    type: Array,
    required: true
  },
  currentIndex: {
    type: Number,
    required: true
  },
  transitionName: {
    type: String,
    default: 'slide'
  }
})

defineEmits(['prev', 'next', 'goto'])
</script>

<style scoped>
.carousel-slide {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.carousel-control.prev {
  left: 20px;
}

.carousel-control.next {
  right: 20px;
}

.carousel-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid white;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator-dot.active {
  background: white;
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
