<template>
  <main>
    <div class="flex justify-between">
      <h1 class="mt-5 font-large">Transaction</h1>
      <!-- <div class="mt-3">
        <router-link to="/admin/lesson-create-admin">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add lesson
          </button>
        </router-link>
      </div> -->
    </div>
    <div>
      <h1>Let's check your update today!!</h1>
    </div>
    <div class="border-style ml-7 mt-5">
      <div class="pb-4 ml-7 mt-5 bg-white dark:bg-gray-900">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
          <div
            class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            v-model="searchKeyword"
            @input="receiptStore.search(searchKeyword)"
            type="text"
            id="table-search"
            class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>
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
                <th
                  class="px-6 py-3 items-center space-x-2 cursor-pointer"
                  @click="receiptStore.changeSort('id')"
                >
                  <span>ID</span>
                  <span v-if="receiptStore.sortBy === 'id'">
                    {{ receiptStore.order === 'asc' ? '⬆' : '⬇' }}
                  </span>
                </th>

                <th
                  class="px-6 py-3 items-center space-x-2 cursor-pointer"
                  @click="receiptStore.changeSort('receipt.user.username')"
                >
                  <span>Student's name</span>
                  <span v-if="receiptStore.sortBy === 'receipt.user.username'">
                    {{ receiptStore.order === 'asc' ? '⬆' : '⬇' }}
                  </span>
                </th>
                <th
                  class="px-6 py-3 items-center space-x-2 cursor-pointer"
                  @click="receiptStore.changeSort('course.id')"
                >
                  <span> Course </span>
                  <span v-if="receiptStore.sortBy === 'course.id'">{{
                    receiptStore.order === 'asc' ? '⬆' : '⬇'
                  }}</span>
                </th>
                <th
                  class="px-6 py-3 items-center space-x-2 cursor-pointer"
                  @click="receiptStore.changeSort('price')"
                >
                  <span> Price </span>
                  <span v-if="receiptStore.sortBy === 'price'">{{
                    receiptStore.order === 'asc' ? '⬆' : '⬇'
                  }}</span>
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
              <!-- <template>
                
                -->
              <tr
                v-for="item in receiptStore.receiptDetail"
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
                  {{ item.receipt.user.username }}
                </td>
                <td style="padding: 11px 20px" class="px-6 py-4">
                  {{ item.course?.name }}
                </td>
                <td style="padding: 11px 20px" class="px-6 py-4">
                  {{ item.price }}
                </td>
                <td style="padding: 11px 20px" class="px-6 py-4">
                  <span style="font-weight: bold" class="text-green-500"> Success </span>
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

                  <!-- <button
                    style="background-color: #f95454"
                    @click="openModal(item.id)"
                    class="style-icon-actions"
                    id="button"
                    :data-modal-toggle="`popup-modal-${selectedLessonId}`"
                    :data-modal-target="`popup-modal-${selectedLessonId}`"
                    type="button"
                  >
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
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                      />
                    </svg>
                  </button> -->
                </td>
              </tr>
            </tbody>
          </table>

          <PaginationLayout
            class="my-5 flex justify-center"
            :currentPage="receiptStore.page"
            :totalPage="receiptStore.totalPagesDetail"
            @page-change="handlePageChange"
          />
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { useReceiptStore } from '@/stores/ReceiptStore'
import PaginationLayout from '@/views/pagination/PaginationLayout.vue'
import { onMounted, ref } from 'vue'

const receiptStore = useReceiptStore()

const searchKeyword = ref<string | ''>('')

const handlePageChange = async (newPage: number) => {
  await receiptStore.changePage(newPage)
}

onMounted(async () => {
  await receiptStore.loadReceiptDetails()
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
