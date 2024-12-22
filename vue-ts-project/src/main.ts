import './assets/main.css'
import './assets/tailwind.css'

import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initFlowbite } from 'flowbite'
import { useLoginStore } from './stores/LoginStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const loginStore = useLoginStore()
loginStore.initialize()

app.mount('#app')
nextTick(() => {
  initFlowbite()
})

router.afterEach(() => {
  nextTick(() => {
    initFlowbite()
  })
})
