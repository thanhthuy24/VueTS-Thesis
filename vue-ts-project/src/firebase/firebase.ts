import { authAPIs, endpoints } from '@/configs/APIs'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const firebaseConfig = {}

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)
// const loginStore = useLoginStore()

export const requestForToken = async (userId: number) => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        'BD9p8So0Of5mAycZ5-pdqNRKr0o_KdeploPIuts78kwQxN7myaWRhKPTOtty3NjdW13JwD2HpmtsMAz9nBGK-K4',
    })
    if (token) {
      console.log('FCM Token:', token)
      await authAPIs().post(endpoints.token, {
        user_id: userId,
        token: token,
      })
      return token
    } else {
      console.log('No registration token available.')
      return null
    }
  } catch (error) {
    console.error('Error retrieving FCM token:', error)
    return null
  }
}

// Lắng nghe tin nhắn từ Firebase
// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       console.log('Message received: ', payload)
//       // new Notification('Test Notification', { body: 'This is a test message!' })

//       if (payload.notification) {
//         new Notification(payload.notification.title || 'No Title', {
//           body: payload.notification.body || 'No Body',
//           icon: payload.notification.icon || '/default-icon.png',
//         })
//       } else {
//         console.warn('Received message without notification field!', payload)
//       }
//       resolve(payload)
//     })
//   })

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/firebase-messaging-sw.js')
//     .then((registration) => {
//       console.log('Service Worker registered:', registration)
//     })
//     .catch((error) => {
//       console.error('Service Worker registration failed:', error)
//     })
// }

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Message received: ', payload)

      if (Notification.permission === 'granted') {
        const notificationTitle = payload?.notification?.title || 'No Title'
        const notificationOptions = {
          body: payload?.notification?.body || 'No Body',
          icon: payload?.notification?.icon || '/default-icon.png',
        }

        new Notification(notificationTitle, notificationOptions)
      } else {
        console.warn('Notification permission not granted!')
      }

      resolve(payload)
    })
  })
