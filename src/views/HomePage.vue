<template>
  <div class="home-container">
    <div class="student-info">
      <p class="student-name">Kemal Uğur Tortum</p>
      <p class="student-no">200101021</p>
    </div>
    <div class="home-content">
      <h1 class="home-title">OMIX Development Pages</h1>
      <p class="home-subtitle">Click on any page to view it</p>

      <div class="pages-grid">
        <router-link
          v-for="page in pages"
          :key="page.path"
          :to="page.path"
          target="_blank"
          class="page-card"
        >
          <div class="page-icon">📄</div>
          <h3 class="page-name">{{ page.name }}</h3>
          <p class="page-path">{{ page.path }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const pages = [
  { name: 'Header', path: '/header' },
  { name: 'Footer', path: '/footer' },
  { name: 'Sign In', path: '/sign-in' },
  { name: 'Register', path: '/register' },
  { name: 'Product', path: '/product' },
  { name: 'Tech Features', path: '/tech-features' },
  { name: 'Purchase', path: '/purchase' },
  { name: 'My Account', path: '/my-account' },
  { name: 'Basket', path: '/basket' },
  { name: 'Carousel', path: '/carousel' }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-container {
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #4facfe 75%,
    #00f2fe 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 20s ease infinite;
  padding: 60px 20px;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  position: relative;
  overflow: hidden;
}

.home-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(255, 121, 198, 0.2) 0%, transparent 40%);
  pointer-events: none;
  animation: floatBubbles 25s ease-in-out infinite;
}

.home-container::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image:
    radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: twinkle 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes floatBubbles {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 30px) scale(0.9);
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.home-content {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.home-title {
  font-size: 64px;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #fff9e6 50%, #ffffff 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  letter-spacing: -1.5px;
  animation:
    fadeInDown 0.8s ease-out,
    shimmer 3s linear infinite;
  text-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
  filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.5));
  position: relative;
}

@keyframes shimmer {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.home-subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.95);
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 60px;
  animation:
    fadeInUp 0.8s ease-out 0.2s both,
    float 3s ease-in-out infinite;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px 0;
}

.page-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 40px 30px;
  text-align: center;
  text-decoration: none;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 0 0 0 rgba(255, 255, 255, 0.4);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  position: relative;
  overflow: hidden;
  animation:
    fadeInScale 0.6s ease-out both,
    cardFloat 6s ease-in-out infinite;
  animation-delay: calc(var(--card-index) * 0.05s), calc(var(--card-index) * 0.2s);
}

@keyframes cardFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-5px) rotate(1deg);
  }
  75% {
    transform: translateY(5px) rotate(-1deg);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.page-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 70%
  );
  opacity: 0;
  transition: all 0.6s ease;
  transform: rotate(45deg);
}

.page-card:hover::before {
  opacity: 1;
  animation: shine 1.5s ease-in-out;
}

@keyframes shine {
  0% {
    left: -50%;
    top: -50%;
  }
  100% {
    left: 150%;
    top: 150%;
  }
}

.page-card:hover {
  transform: translateY(-15px) scale(1.05) rotate(2deg);
  box-shadow:
    0 25px 70px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 50px rgba(255, 255, 255, 0.4),
    0 0 100px rgba(120, 119, 198, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.15);
  animation: none;
}

.page-card:active {
  transform: translateY(-12px) scale(1.02);
  transition: all 0.1s ease;
}

.page-icon {
  font-size: 56px;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  animation: iconBounce 2s ease-in-out infinite;
}

@keyframes iconBounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.page-card:hover .page-icon {
  transform: scale(1.3) rotate(360deg);
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.6));
  animation: none;
}

.page-name {
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
  letter-spacing: -0.3px;
  transition: all 0.4s ease;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.page-card:hover .page-name {
  color: #ffffff;
  text-shadow:
    0 0 10px rgba(255, 255, 255, 0.8),
    0 0 20px rgba(255, 255, 255, 0.6),
    0 0 30px rgba(255, 255, 255, 0.4);
  transform: scale(1.1);
  letter-spacing: 1px;
}

.page-path {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'SF Mono', 'Monaco', 'Courier New', monospace;
  font-weight: 400;
  letter-spacing: 0.5px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.page-card:hover .page-path {
  color: rgba(255, 255, 255, 1);
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* Add staggered animation to cards */
.page-card:nth-child(1) {
  --card-index: 1;
}
.page-card:nth-child(2) {
  --card-index: 2;
}
.page-card:nth-child(3) {
  --card-index: 3;
}
.page-card:nth-child(4) {
  --card-index: 4;
}
.page-card:nth-child(5) {
  --card-index: 5;
}
.page-card:nth-child(6) {
  --card-index: 6;
}
.page-card:nth-child(7) {
  --card-index: 7;
}
.page-card:nth-child(8) {
  --card-index: 8;
}
.page-card:nth-child(9) {
  --card-index: 9;
}
.page-card:nth-child(10) {
  --card-index: 10;
}

@media (max-width: 768px) {
  .home-title {
    font-size: 42px;
    letter-spacing: -1px;
  }

  .home-subtitle {
    font-size: 18px;
  }

  .pages-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }

  .page-card {
    padding: 30px 20px;
    min-height: 170px;
  }

  .page-icon {
    font-size: 44px;
  }

  .page-name {
    font-size: 20px;
  }

  .page-path {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .home-container {
    padding: 40px 15px;
  }

  .home-title {
    font-size: 36px;
  }

  .home-subtitle {
    font-size: 16px;
    margin-bottom: 40px;
  }

  .pages-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .page-card {
    min-height: 160px;
  }
}

/* Smooth scrollbar */
.home-container::-webkit-scrollbar {
  width: 8px;
}

.home-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.home-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.home-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Student Info */
.student-info {
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 16px 24px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  animation: fadeInRight 0.8s ease-out;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.student-name {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 6px 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.3px;
}

.student-no {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-family: 'SF Mono', 'Monaco', 'Courier New', monospace;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .student-info {
    top: 20px;
    right: 20px;
    padding: 12px 18px;
  }

  .student-name {
    font-size: 14px;
  }

  .student-no {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .student-info {
    top: 15px;
    right: 15px;
    padding: 10px 14px;
  }

  .student-name {
    font-size: 13px;
  }

  .student-no {
    font-size: 11px;
  }
}
</style>
