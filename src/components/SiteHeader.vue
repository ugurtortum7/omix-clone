<template>
  <header class="site-header">
    <div class="top-line"></div>
    <div class="header-inner">
      <div class="left">
        <div class="logo">
          <img
            v-if="!showText"
            src="/logo_black.png"
            alt="OMIX logo"
            class="logo-img"
            @error="showText = true"
          />
        </div>
      </div>

      <nav class="main-nav">
        <div class="nav-item has-dropdown">
          <a href="#">Mobil</a>
          <div class="dropdown-menu dropdown-mobil">
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="phone-placeholder"></div>
              </div>
              <div class="product-name">O1 Neo</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="phone-placeholder"></div>
              </div>
              <div class="product-name">O1 Next 5G</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="phone-placeholder"></div>
              </div>
              <div class="product-name">O1 Icon</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="phone-placeholder"></div>
              </div>
              <div class="product-name">X7</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="phone-placeholder"></div>
              </div>
              <div class="product-name">X6</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="phone-placeholder"></div>
              </div>
              <div class="product-name">X5</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="phone-placeholder"></div>
              </div>
              <div class="product-name">X4</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="phone-placeholder"></div>
              </div>
              <div class="product-name">X600</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="phone-placeholder"></div>
              </div>
              <div class="product-name">X3</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="phone-placeholder"></div>
              </div>
              <div class="product-name">X600</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="phone-placeholder"></div>
              </div>
              <div class="product-name">X700</div>
            </a>
          </div>
        </div>
        <div class="nav-item has-dropdown">
          <a href="#">Akıllı Ürünler</a>
          <div class="dropdown-menu dropdown-mobil">
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="device-placeholder"></div>
              </div>
              <div class="product-name">MixPods Pro</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="device-placeholder"></div>
              </div>
              <div class="product-name">MixPods Pro 2</div>
            </a>
          </div>
        </div>
        <div class="nav-item has-dropdown">
          <a href="#">MixO IoT</a>
          <div class="dropdown-menu dropdown-mobil">
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="iot-placeholder"></div>
              </div>
              <div class="product-name">MixBot Pro</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="iot-placeholder"></div>
              </div>
              <div class="product-name">MixLight Pro</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="iot-placeholder"></div>
              </div>
              <div class="product-name">MixBot Plus</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="iot-placeholder"></div>
              </div>
              <div class="product-name">MixCam Baby Pro</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="iot-placeholder"></div>
              </div>
              <div class="product-name">MixAir Desktop Pro</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="iot-placeholder"></div>
              </div>
              <div class="product-name">Wi-Fi Güçlendirici</div>
            </a>
            <a href="#" class="product-item">
              <div class="product-image">
                <div class="iot-placeholder"></div>
              </div>
              <div class="product-name">Akıllı Prizler</div>
            </a>
          </div>
        </div>
        <a href="#">Aksesuarlar</a>
        <a href="#">Destek</a>
        <a href="#">Hakkında</a>
      </nav>

      <div class="right">
        <div class="icons">
          <span class="icon">👤</span>
          <span class="icon">🛒</span>
        </div>
        <div class="lang">TR / EN</div>
      </div>
    </div>
  </header>
</template>

<script setup>
// purely presentational component
import { ref } from 'vue'
const showText = ref(false)
</script>

<style scoped>
.site-header {
  background: white;
  border-bottom: 1px solid #e6e6e6;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial;
}
.top-line {
  height: 6px;
  background: #fff;
}
.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}
.logo {
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 22px;
}
.main-nav {
  display: flex;
  gap: 32px;
  align-items: center;
}
.nav-item {
  position: relative;
}
.main-nav a {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  position: relative;
  padding-bottom: 4px;
  display: inline-block;
}
.main-nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: #000;
  transition: width 0.3s ease;
}
.main-nav a:hover {
  color: #000;
}
.main-nav a:hover::after {
  width: 100%;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  padding: 8px 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 100;
  margin-top: 16px;
}
.dropdown-mobil {
  display: flex;
  gap: 12px;
  padding: 16px 16px 16px 200px;
  min-width: auto;
  left: 50%;
  right: auto;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  transform: translateY(-10px);
  justify-content: center;
}
.nav-item.has-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.nav-item.has-dropdown:hover .dropdown-mobil {
  transform: translateY(0);
}
.dropdown-item {
  display: block;
  padding: 10px 20px;
  color: #333;
  font-size: 14px;
  transition: background 0.2s ease;
}
.dropdown-item:hover {
  background: #f5f5f5;
  color: #000;
}
.dropdown-item::after {
  display: none;
}
.product-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px;
  min-width: 50px;
  transition: background 0.2s ease;
  border-radius: 4px;
}
.product-item:hover {
  background: #f5f5f5;
}
.product-image {
  width: 40px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.phone-placeholder {
  width: 20px;
  height: 50px;
  border: 1px solid #333;
  border-radius: 6px;
  background: white;
}
.device-placeholder {
  width: 50px;
  height: 45px;
  border: 1px solid #333;
  border-radius: 50%;
  background: white;
  position: relative;
}
.device-placeholder::before,
.device-placeholder::after {
  content: '';
  position: absolute;
  width: 15px;
  height: 20px;
  border: 1px solid #333;
  border-radius: 8px;
  background: white;
  top: 50%;
  transform: translateY(-50%);
}
.device-placeholder::before {
  left: 5px;
}
.device-placeholder::after {
  right: 5px;
}
.iot-placeholder {
  width: 45px;
  height: 45px;
  border: 1px solid #333;
  border-radius: 50%;
  background: white;
  position: relative;
}
.iot-placeholder::before {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border: 1px solid #333;
  border-radius: 50%;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.iot-placeholder::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid #333;
  border-radius: 50%;
  background: transparent;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.product-name {
  font-size: 11px;
  color: #333;
  text-align: center;
  white-space: nowrap;
}
.right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.icons .icon {
  margin-right: 8px;
}
.lang {
  font-size: 13px;
  color: #666;
}

@media (max-width: 720px) {
  .main-nav {
    display: none;
  }
}
</style>
