<template>
  <div class="sign-in-container">
    <div class="sign-in-box">
      <h1 class="title">Giriş Yap</h1>

      <form @submit.prevent="handleSubmit" class="sign-in-form">
        <div class="form-group">
          <label for="email">E-Posta</label>
          <input type="email" id="email" v-model="email" class="form-input" required />
        </div>

        <div class="form-group">
          <label for="password">Şifre</label>
          <input type="password" id="password" v-model="password" class="form-input" required />
        </div>

        <div class="form-group">
          <label for="captcha">Güvenlik Kodu</label>
          <div class="captcha-display">1VAOF</div>
          <input
            type="text"
            id="captcha"
            v-model="captcha"
            placeholder="Güvenlik kodunu girin"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label for="captcha"> Şifremi Unuttum ?</label>
        </div>

        <button type="submit" class="submit-btn">Giriş Yap</button>

        <p class="register-link">Hesabınız yok mu? <a href="/register">Kayıt Ol</a></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const captcha = ref('')
const rememberMe = ref(false)

const handleSubmit = () => {
  console.log('Sign in attempt:', {
    email: email.value,
    password: password.value,
    captcha: captcha.value,
    rememberMe: rememberMe.value
  })
}
</script>

<style scoped>
.sign-in-container {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: #f9f9f9;
}

.sign-in-box {
  padding: 50px 60px;
  width: 100%;
  max-width: 480px;
}

.title {
  font-size: 32px;
  font-weight: 300;
  text-align: center;
  margin: 0 0 40px 0;
  color: #333;
}

.sign-in-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 400;
}

.form-input {
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial;
}

.form-input:focus {
  outline: none;
  border-color: #999;
}

.captcha-group {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: flex-end;
}

.captcha-display {
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #333;
  text-align: center;
  margin-bottom: 8px;
  display: inline-block;
  width: fit-content;
}

.captcha-input {
  flex: 1;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #666;
}

.checkbox-label input[type='checkbox'] {
  cursor: pointer;
  width: 16px;
  height: 16px;
}

.submit-btn {
  background: #000;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 10px;
}

.submit-btn:hover {
  background: #333;
}

.register-link {
  text-align: left;
  font-size: 13px;
  color: #666;
  margin-top: 20px;
}

.register-link a {
  color: #000;
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .sign-in-box {
    padding: 40px 30px;
  }

  .captcha-group {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
