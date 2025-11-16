<template>
  <div class="carousel-container">
    <div class="carousel">
      <!-- Previous Button -->
      <button @click="prevSlide" class="carousel-btn prev-btn" aria-label="Previous">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <!-- Carousel Images -->
      <div class="carousel-slides">
        <transition :name="slideDirection">
          <img
            :key="currentIndex"
            :src="images[currentIndex]"
            :alt="`Slide ${currentIndex + 1}`"
            class="carousel-image"
          />
        </transition>
      </div>

      <!-- Next Button -->
      <button @click="nextSlide" class="carousel-btn next-btn" aria-label="Next">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <!-- Dots Indicator -->
      <div class="carousel-dots">
        <button
          v-for="(image, index) in images"
          :key="index"
          @click="goToSlide(index)"
          :class="['dot', { active: currentIndex === index }]"
          :aria-label="`Go to slide ${index + 1}`"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const images = [
  '/carousel/1.jpg',
  '/carousel/2.jpg',
  '/carousel/3.jpg',
  '/carousel/o1_icon-1.jpg',
  '/carousel/o1_neo-2.jpg',
  '/carousel/o1_next_5g.jpg',
  '/carousel/x4.jpg'
]

const currentIndex = ref(0)
const slideDirection = ref('slide-left')
let autoPlayInterval = null

const nextSlide = () => {
  slideDirection.value = 'slide-left'
  currentIndex.value = (currentIndex.value + 1) % images.length
}

const prevSlide = () => {
  slideDirection.value = 'slide-right'
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

const goToSlide = (index) => {
  slideDirection.value = index > currentIndex.value ? 'slide-left' : 'slide-right'
  currentIndex.value = index
}

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    nextSlide()
  }, 5000) // Change slide every 5 seconds
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.carousel-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.carousel {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
}

.carousel-slides {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Slide Transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from {
  transform: translateX(-100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

/* Navigation Buttons */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.carousel-btn:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-50%) scale(1.05);
}

.carousel-btn:active {
  transform: translateY(-50%) scale(0.95);
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}

.carousel-btn svg {
  color: #333;
}

/* Dots Indicator */
.carousel-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid white;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.dot.active {
  background: white;
  transform: scale(1.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .carousel-btn {
    width: 35px;
    height: 35px;
  }

  .prev-btn {
    left: 10px;
  }

  .next-btn {
    right: 10px;
  }

  .carousel-dots {
    bottom: 15px;
    gap: 8px;
  }

  .dot {
    width: 8px;
    height: 8px;
  }
}
</style>
