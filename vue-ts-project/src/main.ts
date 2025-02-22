import './assets/main.css'
import './assets/tailwind.css'

import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initFlowbite } from 'flowbite'
import { useLoginStore } from './stores/LoginStore'
import { useCartStore } from './stores/CartStore'
import 'vue-toastification/dist/index.css'
import Toast, { type PluginOptions } from 'vue-toastification'
import 'simple-datatables/dist/style.css'
import { DataTable } from 'simple-datatables'

import { requestForToken } from '@/firebase/firebase.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const loginStore = useLoginStore()
loginStore.initialize()

const cartStore = useCartStore()
cartStore.initialize()

const options: PluginOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
}
app.config.globalProperties.$DataTable = DataTable
app.use(Toast, options)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope)

      const loginStore = useLoginStore()
      const userId = loginStore.currentUser?.id

      requestForToken(Number(userId))
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error)
    })
}

app.mount('#app')
nextTick(() => {
  initFlowbite()
})

router.afterEach(() => {
  nextTick(() => {
    initFlowbite()
  })
})
