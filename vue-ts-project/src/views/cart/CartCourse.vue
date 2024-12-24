<template>
  <main class="container">
    <h1 class="font-size-title">LIST COURSES IN CART</h1>
    <div
      v-if="cartStore.totalItems === 0"
      style="width: 100%"
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span class="font-medium">Danger alert!</span> Change a few things up and try submitting
      again.
    </div>
    <section v-else class="flex mt-10">
      <div>
        <table id="default-table">
          <thead>
            <tr>
              <th>
                <span class="mr-80 flex items-center"> Course </span>
              </th>
              <th>
                <span class="mr-56 flex items-center"> Price </span>
              </th>
              <th>
                <span class="mr-16 flex items-center"> Old price </span>
              </th>
              <th>
                <span class="mr-10 flex items-center"> Action </span>
              </th>
              <!-- <th><th> -->
            </tr>
            <tr>
              <td colspan="4" class="pt-5 pb-5">
                <hr class="custom-hr" />
              </td>
            </tr>
          </thead>

          <tbody>
            <template v-for="(item, id) in cartStore.cart" :key="id">
              <tr>
                <td>
                  <div style="width: 350px">
                    {{ item.name }}
                  </div>
                </td>
                <td style="color: red">
                  {{ formatCurrencyWithRounding(item.price * (1 - item.discount / 100)) }} VND
                </td>
                <td>
                  <del>{{ formatCurrencyWithRounding(item.price) }} VND </del>
                </td>
                <td @click="cartStore.removeFromCart(item.id)">
                  <svg
                    style="cursor: pointer"
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </td>
              </tr>
              <tr>
                <td colspan="4" class="pt-5 pb-5">
                  <hr class="custom-hr" />
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="w-1/3 div-border ml-10">
        <p class="ml-5 pt-5 pb-5" style="font-weight: bold; font-size: large">ORDER SUMMARY</p>
        <div class="ml-5 pt-5 pb-5">
          <div class="flex">
            <span>Subtotal</span>
            <span class="ml-64">{{ formatCurrencyWithRounding(subtotal) }} VND</span>
          </div>
          <hr class="my-3 mr-16" />
          <div>
            <span>Discount</span>
            <span class="ml-64">{{ formatCurrencyWithRounding(subtotal - totalPrice) }} VND</span>
          </div>
          <hr class="my-3 mr-16" />
          <div>
            <span>Total</span>
            <span class="ml-72" style="color: red"
              >{{ formatCurrencyWithRounding(totalPrice) }} <span>VND</span></span
            >
          </div>
          <div>
            <button
              style="width: 400px; border-radius: 10px; font-size: large"
              type="button"
              class="mx-3 my-8 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Checkout
            </button>
          </div>
          <div>
            <button
              style="width: 400px; border-radius: 10px; font-size: large"
              @click="cartStore.removeAll"
              type="button"
              class="mx-3 my-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { authAPIs, endpoints } from '@/configs/APIs'
import { useCartStore } from '@/stores/CartStore'
import { useLoginStore } from '@/stores/LoginStore'
import { computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const cartStore = useCartStore()
const loginStore = useLoginStore()
const totalPrice = computed(() => {
  return cartStore.cart
    ? Object.values(cartStore.cart).reduce(
        (sum: number, c) => sum + c.price * (1 - c.discount / 100),
        0,
      )
    : 0
})

const subtotal = computed(() => {
  return cartStore.cart ? Object.values(cartStore.cart).reduce((sum, c) => sum + c.price, 0) : 0
})

const formatCurrencyWithRounding = (value: number) => {
  const roundedValue = Math.floor(value) + (value % 1 >= 0.5 ? 1 : 0)
  return roundedValue.toLocaleString().replace(/\B(?=(\d{3})+(?!))/g, ',')
}

const checkout = async () => {
  try {
    const newOrderId = uuidv4()
    const token = loginStore.token

    const res = await authAPIs().post(
      `${endpoints.payment}/create-payment`,
      {
        orderId: newOrderId,
        amount: totalPrice.value, // Sử dụng .value vì đây là ref
        returnUrl: 'http://localhost:8082/cart',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const payUrl = res.data
    if (payUrl) {
      window.location.href = payUrl
    } else {
      console.error('payUrl không tồn tại')
    }
  } catch (err) {
    console.error('Thanh toán thất bại: ' + err)
  }
}
</script>
<style scoped>
.font-size-title {
  font-size: xx-large;
  font-weight: bold;
}
.custom-hr {
  width: 100%; /* Đặt chiều rộng bằng 100% */
  border: none; /* Xóa border mặc định */
  border-top: 3px solid black; /* Đặt độ dày và màu cho đường */
  margin: 0; /* Xóa margin */
}
.div-border {
  border: 1px solid grey;
  border-radius: 10px;
  /* padding: 5px; */
}
</style>
