<template>
  <div class="product-container">
    <div class="product-content">
      <div class="product-image">
        <img src="/o1-neo.png" alt="O1 Neo" />
      </div>

      <div class="product-info">
        <h1 class="product-title">O1 Neo</h1>

        <div class="product-description">
          <p>64 MP yüksek çözünürlüklü kamerası,</p>
          <p>Dolby Atmos ses teknolojisi ve</p>
          <p>çarpıcı renkleriyle</p>
          <p>kendi stilini özgürce yansıt.</p>
        </div>

        <button class="explore-btn">KEŞFET</button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.product-container {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: white;
}

.product-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 60px;
  max-width: 1100px;
  width: 100%;
  background: #e1e3e3;
  border-radius: 30px;
  padding: 70px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.product-image {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.product-image img {
  max-width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
}

.product-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  text-align: left;
  flex: 1;
}

.product-title {
  font-size: 48px;
  font-weight: 700;
  margin: 0;
  color: #000;
  letter-spacing: -1px;
}

.product-description {
  font-size: 16px;
  color: #888;
  line-height: 1.6;
}

.product-description p {
  margin: 0;
}

.explore-btn {
  background: #888;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 40px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  align-self: flex-start;
  letter-spacing: 1px;
}

.explore-btn:hover {
  background: #666;
}

@media (max-width: 768px) {
  .product-content {
    flex-direction: column;
    gap: 40px;
  }

  .product-info {
    align-items: center;
    text-align: center;
  }

  .explore-btn {
    align-self: center;
  }

  .product-title {
    font-size: 48px;
  }

  .product-description {
    font-size: 16px;
  }
}
</style>
