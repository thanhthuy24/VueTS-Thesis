<template>
  <h1>Đang chờ xử lý</h1>
</template>
<script lang="ts" setup>
import { useLoginStore } from '@/stores/LoginStore'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loginStore = useLoginStore()

onMounted(async () => {
  const code = route.query.code as string // Lấy code từ URL
  console.log(code)
  if (!code) {
    console.error('No code found in URL')
    return
  } else {
    await loginStore.loadLoginBySocialGoogle(code)
  }
})
</script>
