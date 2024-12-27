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

app.use(Toast, options)

app.mount('#app')
nextTick(() => {
  initFlowbite()
})

router.afterEach(() => {
  nextTick(() => {
    initFlowbite()
  })
})
