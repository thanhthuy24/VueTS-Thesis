importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js')

// Cấu hình Firebase
const firebaseConfig = {}

// Khởi tạo Firebase trong Service Worker
firebase.initializeApp(firebaseConfig)

// Lấy instance của Firebase Messaging
const messaging = firebase.messaging()

// Lắng nghe tin nhắn khi ứng dụng ở chế độ nền (background)
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload)

  // Hiển thị thông báo
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon || '/firebase-logo.png',
  })
})
