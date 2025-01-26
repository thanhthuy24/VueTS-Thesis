<template>
  <main class="flex justify-center">
    <div>
      <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          My Register form
        </h2>
        <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
          Tracking status of your list register
        </p>
      </div>
      <div style="width: 1200px" class="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Id</th>
              <th scope="col" class="px-6 py-3">Position</th>
              <th scope="col" class="px-6 py-3">Reason</th>
              <th scope="col" class="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in registerStore.listForm"
              :key="item.id"
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td class="px-6 py-4">{{ item.id }}</td>
              <td class="px-6 py-4">
                {{ item.position }}
              </td>

              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ toggleReadMore ? item.reason : `${item.reason.slice(0, maxLength)}...` }}
              </th>
              <td class="px-6 py-4">
                <span
                  style="font-weight: bold"
                  :class="item.status ? 'text-green-500' : 'text-red-500'"
                >
                  {{ item.status ? 'Approved' : 'Pending' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
// import { useLoginStore } from '@/stores/LoginStore'
import { useRegisterFormStore } from '@/stores/RegisterFormStore'
import { onMounted, ref } from 'vue'
const toggleReadMore = ref(false)
const maxLength = 100
const registerStore = useRegisterFormStore()
// const loginStore = useLoginStore()

// const userId = Number(loginStore.currentUser?.id)

onMounted(async () => {
  await registerStore.loadRegisterForm()
})
</script>
