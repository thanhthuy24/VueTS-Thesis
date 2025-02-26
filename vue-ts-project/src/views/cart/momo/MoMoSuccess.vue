<template>
  <div class="success-notification">
    <div class="notification-container">
      <div class="icon-container">
        <!-- SVG Icon -->
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="success-svg"
        >
          <path
            d="M15.5071 10.5245C15.8 10.2316 15.8 9.75674 15.5071 9.46384C15.2142 9.17095 14.7393 9.17095 14.4464 9.46384L10.9649 12.9454L9.55359 11.5341C9.2607 11.2412 8.78582 11.2412 8.49293 11.5341C8.20004 11.827 8.20004 12.3019 8.49294 12.5947L10.4346 14.5364C10.7275 14.8293 11.2023 14.8292 11.4952 14.5364L15.5071 10.5245Z"
            fill="#00ad72"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12Z"
            fill="#00ad72"
          />
        </svg>
      </div>
      <h1 class="title">Thanh toán thành công!</h1>
      <p class="message">
        Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Hóa đơn của bạn đã được xử lý thành công.
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useCartStore } from '@/stores/CartStore'
import { useLoginStore } from '@/stores/LoginStore'
import { onMounted } from 'vue'

const cartStore = useCartStore()
const loginStore = useLoginStore()
const token = loginStore.token

onMounted(async () => {
  await cartStore.checkoutSuccessMoMo(token)
})
</script>
<style scoped>
.success-notification {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.notification-container {
  text-align: center;
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
}

.success-svg {
  display: block;
}
.title {
  font-size: 1.8rem;
  color: #333333;
  margin-bottom: 1rem;
}

.message {
  font-size: 1rem;
  color: #666666;
  margin-bottom: 2rem;
}
</style>
