<template>
  <main>
    <div class="flex justify-between">
      <h1 class="mt-5 font-large">Register form List</h1>
    </div>
    <div>
      <h1>Let's check your update today!!</h1>
    </div>
    <div class="border-style ml-7 mt-5">
      <div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            id="filter-table"
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th class="px-6 py-3 items-center space-x-2 cursor-pointer">
                  <span>ID</span>
                </th>

                <th class="px-6 py-3 items-center space-x-2 cursor-pointer">
                  <span>Username</span>
                </th>
                <th class="px-6 py-3 items-center space-x-2 cursor-pointer">
                  <span> Position </span>
                </th>
                <th class="px-6 py-3 items-center space-x-2 cursor-pointer">
                  <span> Reason </span>
                </th>
                <th scope="col" style="padding: 11px 20px" class="px-6 py-3">
                  <span class="flex items-center"> Status </span>
                </th>
                <th scope="col" style="padding: 11px 20px" class="px-6 py-3">
                  <span class="flex items-center"> Actions </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- <template> v-for="item in lessonStore.lessonList"
                :key="item.id" -->
              <tr
                v-for="item in registerStore.allFormAdmin"
                :key="item.id"
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td
                  class="px-6 py-4"
                  style="padding: 11px 20px; color: blue; text-decoration: underline"
                >
                  {{ item.id }}
                </td>
                <td style="padding: 11px 20px" class="px-6 py-4">
                  {{ item.user?.username }}
                </td>
                <td style="padding: 11px 20px" class="px-6 py-4">
                  {{ item.position }}
                </td>
                <td style="padding: 11px 20px" class="px-6 py-4">
                  {{ toggleReadMore ? item.reason : `${item.reason.slice(0, maxLength)}...` }}
                </td>
                <td style="padding: 11px 20px" class="px-6 py-4">
                  <span
                    style="font-weight: bold"
                    :class="item.status ? 'text-green-500' : 'text-yellow-400'"
                  >
                    {{ item.status ? 'Submitted' : 'Pending' }}
                  </span>
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <RouterLink
                    :to="{ name: 'register-detail-admin', params: { registerId: item.id } }"
                  >
                    <button class="mr-3 style-icon-actions" style="background-color: #f7e8f6">
                      <svg
                        style="margin-left: 2.5px"
                        class="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M18 5V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5M9 3v4a1 1 0 0 1-1 1H4m11.383.772 2.745 2.746m1.215-3.906a2.089 2.089 0 0 1 0 2.953l-6.65 6.646L9 17.95l.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"
                        />
                      </svg>
                    </button>
                  </RouterLink>
                  <button
                    class="mr-3 style-icon-actions"
                    @click="openModal(item.id)"
                    id="button"
                    :data-modal-toggle="`popup-modal-${selectedRegisterId}`"
                    :data-modal-target="`popup-modal-${selectedRegisterId}`"
                    style="background-color: #c2ffc7"
                  >
                    <svg
                      style="margin-left: 2.5px"
                      class="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(0 0 0)"
                    >
                      <path
                        d="M20.75 18.5V8.67794L19.25 10.1779V18.5C19.25 18.9142 18.9142 19.25 18.5 19.25H5.5C5.08579 19.25 4.75 18.9142 4.75 18.5V5.5C4.75 5.08579 5.08579 4.75 5.5 4.75H18.314L19.2936 3.77034C19.3842 3.67974 19.4806 3.59848 19.5816 3.52657C19.2607 3.35027 18.8921 3.25 18.5 3.25H5.5C4.25736 3.25 3.25 4.25736 3.25 5.5V18.5C3.25 19.7426 4.25736 20.75 5.5 20.75H18.5C19.7426 20.75 20.75 19.7426 20.75 18.5Z"
                        fill="#343C54"
                        stroke="#343C54"
                        stroke-width="1"
                      />
                      <path
                        d="M20.4838 6.51868C20.7767 6.22578 20.7767 5.75091 20.4838 5.45802C20.1909 5.16512 19.7161 5.16512 19.4232 5.45802L11.9298 12.9514L8.57686 9.59849C8.28396 9.3056 7.80909 9.3056 7.5162 9.5985C7.22331 9.89139 7.22331 10.3663 7.5162 10.6592L11.3995 14.5424C11.6924 14.8353 12.1672 14.8353 12.4601 14.5424L20.4838 6.51868Z"
                        fill="#343C54"
                        stroke="#343C54"
                        stroke-width="1"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-for="item in registerStore.allFormAdmin"
            :key="item.id"
            :id="`popup-modal-${item.id}`"
            tabindex="-1"
            class="flex justify-centerinset-0 bg-black bg-opacity-50 ml-36 hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div class="relative p-4 w-full max-w-md max-h-full">
              <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <button
                  @click="closeModal"
                  type="button"
                  class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
                <div class="p-4 md:p-5 text-center">
                  <svg
                    class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this course?
                  </h3>
                  <p style="font-size: small" class="mb-5 text-gray-500 dark:text-gray-400">
                    It's delete all lessons, videos and assignments too!!
                  </p>
                  <button
                    @click="submit(item.id, item.position, item.reason, item.user.id)"
                    :data-modal-hide="`popup-modal-${selectedRegisterId}`"
                    type="button"
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    @click="closeModal"
                    :data-modal-hide="`popup-modal-${selectedRegisterId}`"
                    type="button"
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
// import { useReceiptStore } from '@/stores/ReceiptStore'
import { useRegisterFormStore } from '@/stores/RegisterFormStore'
import { onMounted, ref } from 'vue'
// import PaginationLayout from '@/views/pagination/PaginationLayout.vue'

const registerStore = useRegisterFormStore()
const toggleReadMore = ref(false)
const maxLength = 80

const selectedRegisterId = ref<number | null>(null)

// Hàm mở modal
const openModal = (id: number) => {
  selectedRegisterId.value = id

  // Đảm bảo modal có tồn tại trước khi hiển thị
  const modal = document.getElementById(`popup-modal-${id}`)
  if (modal) {
    modal.classList.remove('hidden') // Nếu dùng Tailwind
  }
}

const closeModal = () => {
  if (selectedRegisterId.value !== null) {
    const modal = document.getElementById(`popup-modal-${selectedRegisterId.value}`)
    if (modal) {
      modal.classList.add('hidden') // Nếu dùng Tailwind
    }
    selectedRegisterId.value = null // Reset lại sau khi đóng modal
  }
}

const submit = async (registerId: number, position: string, reason: string, userId: number) => {
  if (selectedRegisterId.value !== null) {
    await registerStore.submitRegisterFormIcon(registerId, position, reason, userId)
    closeModal()
    // await registerStore.loadRegisterById(registerId)
  }
}

onMounted(async () => {
  await registerStore.loadRegisterFormAdmin()
})
</script>
<style scoped>
.font-large {
  font-size: large;
  font-weight: bold;
}

.border-style {
  border: 1px solid black;
  width: 1200px;
}

.style-icon-actions {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 10px;
}
</style>
