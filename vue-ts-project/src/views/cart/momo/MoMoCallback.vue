<template>
  <div class="payment-status">
    <h2>Đang xử lý thanh toán...</h2>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const status = route.query.status
  const errorCode = route.query.errorCode

  if (status === 'success' && errorCode === '0') {
    try {
      // toast.success('Thanh toán thành công!')
      router.push('/momo/success')
    } catch (error) {
      console.error('Lỗi xác nhận thanh toán:', error)
      alert('Có lỗi xảy ra! Vui lòng thử lại.')
      router.push('/momo/cancel')
    }
  } else {
    toast.error('Thanh toán thất bại!')
    router.push('/momo/cancel')
  }
})
</script>
