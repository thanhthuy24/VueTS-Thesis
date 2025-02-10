<template>
  <main>
    <div class="flex justify-between">
      <h1 class="mt-5 font-large">Lesson</h1>
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
            @input="lessonStore.search(searchKeyword)"
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
                  @click="lessonStore.changeSort('id')"
                >
                  <span>ID</span>
                  <span v-if="lessonStore.sortBy === 'id'">
                    {{ lessonStore.order === 'asc' ? '⬆' : '⬇' }}
                  </span>
                </th>

                <th
                  class="px-6 py-3 items-center space-x-2 cursor-pointer"
                  @click="lessonStore.changeSort('name')"
                >
                  <span>Name</span>
                  <span v-if="lessonStore.sortBy === 'name'">
                    {{ lessonStore.order === 'asc' ? '⬆' : '⬇' }}
                  </span>
                </th>
                <th
                  class="px-6 py-3 items-center space-x-2 cursor-pointer"
                  @click="lessonStore.changeSort('course.id')"
                >
                  <span> Course </span>
                  <span v-if="lessonStore.sortBy === 'course.id'">{{
                    lessonStore.order === 'asc' ? '⬆' : '⬇'
                  }}</span>
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
              <!-- <template> -->
              <tr
                v-for="item in lessonStore.lessonList"
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
                  {{ item.name }}
                </td>
                <td style="padding: 11px 20px" class="px-6 py-4">
                  {{ item.course?.name }}
                </td>
                <td style="padding: 11px 20px" class="px-6 py-4">
                  {{ lessonStore.countVideo[item.id] }}
                </td>
                <td style="padding: 11px 20px" class="px-6 py-4">
                  <span
                    style="font-weight: bold"
                    :class="item.isActive ? 'text-green-500' : 'text-red-500'"
                  >
                    {{ item.isActive ? 'Active' : 'Inactice' }}
                  </span>
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <RouterLink :to="{ name: 'lesson-update-admin', params: { lessonId: item.id } }">
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
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-for="item in lessonStore.lessonList"
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
                    @click="deleteLesson"
                    :data-modal-hide="`popup-modal-${selectedLessonId}`"
                    type="button"
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    @click="closeModal"
                    :data-modal-hide="`popup-modal-${selectedLessonId}`"
                    type="button"
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <PaginationLayout
            class="my-5 flex justify-center"
            :currentPage="lessonStore.page"
            :totalPage="lessonStore.totalPages"
            @page-change="handlePageChange"
          />
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { useLessonStore } from '@/stores/LessonStore'
import PaginationLayout from '@/views/pagination/PaginationLayout.vue'
import { onMounted, ref } from 'vue'

const lessonStore = useLessonStore()

const searchKeyword = ref<string | ''>('')

const handlePageChange = async (newPage: number) => {
  await lessonStore.changePage(newPage)
}

const selectedLessonId = ref<number | null>(null)
const openModal = (id: number) => {
  selectedLessonId.value = id

  // Đảm bảo modal có tồn tại trước khi hiển thị
  const modal = document.getElementById(`popup-modal-${id}`)
  if (modal) {
    modal.classList.remove('hidden') // Nếu dùng Tailwind
  }
}

const closeModal = () => {
  if (selectedLessonId.value !== null) {
    const modal = document.getElementById(`popup-modal-${selectedLessonId.value}`)
    if (modal) {
      modal.classList.add('hidden') // Nếu dùng Tailwind
    }
    selectedLessonId.value = null // Reset lại sau khi đóng modal
  }
}

const deleteLesson = async () => {
  if (selectedLessonId.value !== null) {
    console.log(`Deleting course ID: ${selectedLessonId.value}`)
    await lessonStore.deleteLesson(selectedLessonId.value)
    closeModal()
  }
}

onMounted(async () => {
  await lessonStore.loadAllLessons()
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
