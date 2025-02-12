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
                  <span>Name</span>
                </th>
                <th class="px-6 py-3 items-center space-x-2 cursor-pointer">
                  <span> Course </span>
                </th>
                <th class="px-6 py-3 items-center space-x-2 cursor-pointer">
                  <span> Videos </span>
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
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td
                  class="px-6 py-4"
                  style="padding: 11px 20px; color: blue; text-decoration: underline"
                >
                  <!-- {{ item.id }} -->
                </td>
                <td style="padding: 11px 20px" class="px-6 py-4">
                  <!-- {{ item.name }} -->
                </td>
                <td style="padding: 11px 20px" class="px-6 py-4">
                  <!-- {{ item.course?.name }} -->
                </td>
                <td style="padding: 11px 20px" class="px-6 py-4">
                  <!-- {{ lessonStore.countVideo[item.id] }} -->
                </td>
                <td style="padding: 11px 20px" class="px-6 py-4">
                  <span style="font-weight: bold">
                    <!-- :class="item.isActive ? 'text-green-500' : 'text-red-500'" -->
                    <!-- {{ item.isActive ? 'Active' : 'Inactice' }} -->
                  </span>
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <!-- <RouterLink :to="{ name: 'lesson-update-admin', params: { lessonId: item.id } }"> -->
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
                  <!-- </RouterLink> -->
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <PaginationLayout
            class="my-5 flex justify-center"
            :currentPage="lessonStore.page"
            :totalPage="lessonStore.totalPages"
            @page-change="handlePageChange"
          /> -->
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
// import { useReceiptStore } from '@/stores/ReceiptStore'
import { useRegisterFormStore } from '@/stores/RegisterFormStore'
import { onMounted } from 'vue'
// import PaginationLayout from '@/views/pagination/PaginationLayout.vue'

const registerStore = useRegisterFormStore()

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
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 10px;
}
</style>
