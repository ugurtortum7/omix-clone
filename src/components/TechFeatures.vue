<template>
  <div class="tech-features-container">
    <div class="tech-features-content">
      <!-- Product Header Section -->
      <div class="product-header">
        <div class="product-image">
          <img src="/black-neo.png" alt="O1 Neo Black" />
          <div class="product-badge">O1 Neo - 6 GB Ram - 128 GB</div>
        </div>
        <h1 class="product-title">O1 Neo - 6 GB Ram - 128 GB</h1>
      </div>

      <!-- Technical Specifications -->
      <div class="specs-grid">
        <!-- Ağ (Network) -->
        <div class="spec-section">
          <h2 class="spec-title">Ağ</h2>
          <div class="spec-details">
            <p class="spec-detail">2G: B3/8; 3G: B1/4G: B1/3/7/8/20/38/40/41</p>
          </div>
        </div>

        <!-- Gövde (Body) -->
        <div class="spec-section">
          <h2 class="spec-title">Gövde</h2>
          <div class="spec-details">
            <p class="spec-detail">Boyut: 168.80*76.25*8.75mm</p>
            <p class="spec-detail">Ağırlık: 205g</p>
            <p class="spec-detail">SIM: Çift SIM (SIM1 + SIM2 / Micro SD)</p>
            <p class="spec-detail">NFC: Var</p>
            <p class="spec-detail">Renk: Siyah, Mavi, Altın, Pembe, Turkuaz, Beyaz</p>
          </div>
        </div>

        <!-- Ekran (Display) -->
        <div class="spec-section">
          <h2 class="spec-title">Ekran</h2>
          <div class="spec-details">
            <p class="spec-detail">Tip: FHD+ IPS</p>
            <p class="spec-detail">Ölçü ve Çözünürlük: 6.78", 1080 X 2460</p>
            <p class="spec-detail">Ekran Yenileme Hızı: 120 Hz</p>
            <p class="spec-detail">Ekran Camı: Panda</p>
          </div>
        </div>

        <!-- Platform -->
        <div class="spec-section">
          <h2 class="spec-title">Platform</h2>
          <div class="spec-details">
            <p class="spec-detail">Yonga Seti: Helio G100</p>
            <p class="spec-detail">İşlemci: 2x A76 2.2GHz & A55 2.0G</p>
            <p class="spec-detail">GPU: G57 MC2 1GHz</p>
          </div>
        </div>

        <!-- Kamera (Camera) -->
        <div class="spec-section">
          <h2 class="spec-title">Kamera</h2>
          <div class="spec-details">
            <p class="spec-detail">Ana Modüler: 64MP AF + 5MP FF</p>
            <p class="spec-detail">Ön Kamera: 8MP FF</p>
            <p class="spec-detail">
              Kamera Özellikleri: Led Flaş, Gece Fotoğraf Modu, Gece Video Modu
            </p>
          </div>
        </div>

        <!-- Hafıza (Memory) -->
        <div class="spec-section">
          <h2 class="spec-title">Hafıza</h2>
          <div class="spec-details">
            <p class="spec-detail">Ram: 6/8GB Dahili: 128 GB</p>
          </div>
        </div>

        <!-- Pil (Battery) -->
        <div class="spec-section">
          <h2 class="spec-title">Pil</h2>
          <div class="spec-details">
            <p class="spec-detail">Tip: 5000 mAh Şarj: 33W</p>
          </div>
        </div>

        <!-- Güvenlik (Security) -->
        <div class="spec-section">
          <h2 class="spec-title">Güvenlik</h2>
          <div class="spec-details">
            <p class="spec-detail">Yüz Tanıma: Var</p>
          </div>
        </div>

        <!-- Özellikler (Features) -->
        <div class="spec-section">
          <h2 class="spec-title">Özellikler</h2>
          <div class="spec-details">
            <p class="spec-detail">3.5mm kulaklık girişi: Var</p>
            <p class="spec-detail">WLAN: Var</p>
            <p class="spec-detail">Bluetooth: 5.0</p>
            <p class="spec-detail">GPS: Var</p>
            <p class="spec-detail">FM Radyo: Var</p>
            <p class="spec-detail">USB: Type-C</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.tech-features-container {
  min-height: 100vh;
  background: white;
  padding: 60px 20px;
}

.tech-features-content {
  max-width: 1200px;
  margin: 0 auto;
}

.product-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
}

.product-image {
  position: relative;
  margin-bottom: 30px;
  padding-bottom: 60px;
}

.product-image img {
  max-width: 300px;
  height: auto;
  object-fit: contain;
}

.product-badge {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #000;
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.product-title {
  font-size: 24px;
  font-weight: 400;
  color: #333;
  margin: 0;
  text-align: center;
}

.specs-grid {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.spec-section {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 30px;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  align-items: start;
}

.spec-section:last-child {
  border-bottom: none;
}

.spec-title {
  font-size: 36px;
  font-weight: 300;
  color: #333;
  margin: 0;
  letter-spacing: -0.5px;
}

.spec-detail {
  font-size: 15px;
  color: #666;
  line-height: 1.8;
  margin: 8px 0;
}

@media (max-width: 768px) {
  .tech-features-container {
    padding: 40px 20px;
  }

  .product-image img {
    max-width: 250px;
  }

  .product-title {
    font-size: 20px;
  }

  .spec-section {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .spec-title {
    font-size: 28px;
  }

  .spec-detail {
    font-size: 14px;
  }
}
</style>
