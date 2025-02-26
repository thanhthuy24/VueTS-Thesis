<template>
  <div class="error-notification">
    <div class="notification-container">
      <div class="icon-container">
        <!-- SVG Icon -->
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="error-svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 13.4142L14.8284 16.2426C15.2189 16.6332 15.8511 16.6332 16.2426 16.2426C16.6332 15.8521 16.6332 15.2199 16.2426 14.8284L13.4142 12L16.2426 9.17157C16.6332 8.78105 16.6332 8.14885 16.2426 7.75732C15.8521 7.3668 15.2199 7.3668 14.8284 7.75732L12 10.5858L9.17157 7.75732C8.78105 7.3668 8.14885 7.3668 7.75732 7.75732C7.3668 8.14885 7.3668 8.78105 7.75732 9.17157L10.5858 12L7.75732 14.8284C7.3668 15.2199 7.3668 15.8521 7.75732 16.2426C8.14885 16.6332 8.78105 16.6332 9.17157 16.2426L12 13.4142Z"
            fill="#D32F2F"
          />
        </svg>
      </div>
      <h1 class="title">Thanh toán không thành công</h1>
      <p class="message">
        Rất tiếc, giao dịch của bạn không được xử lý thành công. Vui lòng thử lại hoặc liên hệ với
        chúng tôi để được hỗ trợ.
      </p>
      <RouterLink to="/cart"> <button class="retry-button">Thử lại</button></RouterLink>
    </div>
  </div>
</template>
<script lang="ts"></script>
<style scoped>
.error-notification {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fdf2f2;
}

.notification-container {
  text-align: center;
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  border: 1px solid #f8d7da;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
}

.error-svg {
  display: block;
  fill: #d32f2f; /* Màu đỏ biểu tượng */
}

.title {
  font-size: 1.8rem;
  color: #d32f2f;
  margin-bottom: 1rem;
}

.message {
  font-size: 1rem;
  color: #666666;
  margin-bottom: 2rem;
}

.retry-button {
  padding: 0.75rem 1.5rem;
  background-color: #d32f2f;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background-color: #b71c1c;
}
</style>
