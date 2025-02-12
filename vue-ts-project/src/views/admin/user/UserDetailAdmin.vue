<template>
  <main>
    <div class="flex justify-between">
      <h1 class="mt-5 font-large">Students</h1>
      <div class="mt-3">
        <router-link to="/admin/lesson-create-admin">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add student
          </button>
        </router-link>
      </div>
    </div>
    <div>
      <h1>Let's check your update today!!</h1>
    </div>
    <div class="border-style ml-7 mt-5">
      <div class="pb-4 ml-7 mt-5 mr-7 bg-white dark:bg-gray-900">
        <div class="grid grid-cols-10 gap-2">
          <div class="col-span-3 format-user-general">
            <div class="p-2">
              <div class="flex justify-center">
                <img class="w-36 h-36 rounded-full" alt="avatar" :src="userStore.user?.avatar" />
              </div>
              <div class="flex justify-center">
                <h1 class="mt-5 font-large">
                  {{ userStore.user?.firstName }} {{ userStore.user?.lastName }}
                </h1>
              </div>
              <div class="flex justify-center my-5">
                <div>
                  <div class="format-icon-user w-12 h-12" style="background-color: #fff6b3">
                    <svg
                      class="w-8 h-8 mt-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="#FFD43B"
                        d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5l0-377.4c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8L0 454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5l0-370.3c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11L304 456c0 11.4 11.7 19.3 22.4 15.5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div class="font-large flex justify-center mt-5">
                      <span>{{ userStore.countEnroll }}</span>
                    </div>
                    <span>Courses</span>
                  </div>
                </div>
                <div class="ml-5">
                  <div style="background-color: #e8f9ff" class="format-icon-user w-12 h-12 ml-4">
                    <svg
                      class="w-8 h-8 mt-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path
                        fill="#74C0FC"
                        d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div class="font-large flex justify-center mt-5">
                      <span>{{ userStore.countEnroll }}</span>
                    </div>
                    <span>Certificates</span>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <div>
                  <h1 class="mt-5" style="font-weight: bold">Personal Information</h1>
                </div>
                <div class="flex">
                  <div class="mr-5 mt-5">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(0 0 0)"
                    >
                      <path
                        d="M7.18535 12.75C7.18535 12.3082 7.54352 11.95 7.98535 11.95H7.99535C8.43718 11.95 8.79535 12.3082 8.79535 12.75C8.79535 13.1918 8.43718 13.55 7.99535 13.55H7.98535C7.54352 13.55 7.18535 13.1918 7.18535 12.75Z"
                        fill="#343C54"
                      />
                      <path
                        d="M7.98535 15.95C7.54352 15.95 7.18535 16.3082 7.18535 16.75C7.18535 17.1918 7.54352 17.55 7.98535 17.55H7.99535C8.43718 17.55 8.79535 17.1918 8.79535 16.75C8.79535 16.3082 8.43718 15.95 7.99535 15.95H7.98535Z"
                        fill="#343C54"
                      />
                      <path
                        d="M11.1951 12.75C11.1951 12.3082 11.5533 11.95 11.9951 11.95H12.0051C12.4469 11.95 12.8051 12.3082 12.8051 12.75C12.8051 13.1918 12.4469 13.55 12.0051 13.55H11.9951C11.5533 13.55 11.1951 13.1918 11.1951 12.75Z"
                        fill="#343C54"
                      />
                      <path
                        d="M11.9951 15.95C11.5533 15.95 11.1951 16.3082 11.1951 16.75C11.1951 17.1918 11.5533 17.55 11.9951 17.55H12.0051C12.4469 17.55 12.8051 17.1918 12.8051 16.75C12.8051 16.3082 12.4469 15.95 12.0051 15.95H11.9951Z"
                        fill="#343C54"
                      />
                      <path
                        d="M15.2049 12.75C15.2049 12.3082 15.5631 11.95 16.0049 11.95H16.0149C16.4567 11.95 16.8149 12.3082 16.8149 12.75C16.8149 13.1918 16.4567 13.55 16.0149 13.55H16.0049C15.5631 13.55 15.2049 13.1918 15.2049 12.75Z"
                        fill="#343C54"
                      />
                      <path
                        d="M16.0049 15.95C15.5631 15.95 15.2049 16.3082 15.2049 16.75C15.2049 17.1918 15.5631 17.55 16.0049 17.55H16.0149C16.4567 17.55 16.8149 17.1918 16.8149 16.75C16.8149 16.3082 16.4567 15.95 16.0149 15.95H16.0049Z"
                        fill="#343C54"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.75 2.75C8.75 2.33579 8.41421 2 8 2C7.58579 2 7.25 2.33579 7.25 2.75V3.75H5.5C4.25736 3.75 3.25 4.75736 3.25 6V19C3.25 20.2426 4.25736 21.25 5.5 21.25H18.5C19.7426 21.25 20.75 20.2426 20.75 19V6C20.75 4.75736 19.7426 3.75 18.5 3.75H16.75V2.75C16.75 2.33579 16.4142 2 16 2C15.5858 2 15.25 2.33579 15.25 2.75V3.75H8.75V2.75ZM19.25 8.25V6C19.25 5.58579 18.9142 5.25 18.5 5.25H5.5C5.08579 5.25 4.75 5.58579 4.75 6V8.25H19.25ZM4.75 9.75H19.25V19C19.25 19.4142 18.9142 19.75 18.5 19.75H5.5C5.08579 19.75 4.75 19.4142 4.75 19V9.75Z"
                        fill="#343C54"
                      />
                    </svg>
                  </div>
                  <div class="mt-5">{{ formatDate(userStore.user?.dateOfBirth) }}</div>
                </div>
                <div class="flex">
                  <div class="mr-5 mt-5">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(0 0 0)"
                    >
                      <path
                        d="M11 17.5C10.5858 17.5 10.25 17.8358 10.25 18.25C10.25 18.6642 10.5858 19 11 19H13C13.4142 19 13.75 18.6642 13.75 18.25C13.75 17.8358 13.4142 17.5 13 17.5H11Z"
                        fill="#343C54"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 2C6.75736 2 5.75 3.00736 5.75 4.25V19.75C5.75 20.9926 6.75736 22 8 22H16C17.2426 22 18.25 20.9926 18.25 19.75V4.25C18.25 3.00736 17.2426 2 16 2H8ZM7.25 4.25C7.25 3.83579 7.58579 3.5 8 3.5H16C16.4142 3.5 16.75 3.83579 16.75 4.25V19.75C16.75 20.1642 16.4142 20.5 16 20.5H8C7.58579 20.5 7.25 20.1642 7.25 19.75V4.25Z"
                        fill="#343C54"
                      />
                    </svg>
                  </div>
                  <div class="mt-5">{{ userStore.user?.phone }}</div>
                </div>
                <div class="flex">
                  <div class="mr-5 mt-5">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(0 0 0)"
                    >
                      <path
                        d="M2.5 5.53125C2.5 4.28861 3.50736 3.28125 4.75 3.28125H19.25C20.4926 3.28125 21.5 4.28861 21.5 5.53125V16.0796C21.5 17.3223 20.4926 18.3296 19.25 18.3296H15.1014L12.6025 21.6956C12.461 21.8861 12.2377 21.9985 12.0003 21.9985C11.763 21.9985 11.5396 21.8861 11.3981 21.6956L8.89931 18.3296H4.75C3.50736 18.3296 2.5 17.3223 2.5 16.0796V5.53125ZM7 9.02441C6.58579 9.02441 6.25 9.3602 6.25 9.77441C6.25 10.1886 6.58579 10.5244 7 10.5244H17C17.4142 10.5244 17.75 10.1886 17.75 9.77441C17.75 9.3602 17.4142 9.02441 17 9.02441H7ZM6.25 12.7744C6.25 13.1886 6.58579 13.5244 7 13.5244H12C12.4142 13.5244 12.75 13.1886 12.75 12.7744C12.75 12.3602 12.4142 12.0244 12 12.0244H7C6.58579 12.0244 6.25 12.3602 6.25 12.7744Z"
                        fill="#343C54"
                      />
                    </svg>
                  </div>
                  <div class="mt-5">{{ userStore.user?.email }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-7 format-user-general">
            <div class="flex justify-between">
              <h1 class="mt-5 font-large" style="font-weight: bold">Enrolled Courses</h1>
              <div class="pb-4 ml-7 mt-2 bg-white dark:bg-gray-900">
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
            </div>
            <div>
              <table
                id="filter-table"
                class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                <thead
                  class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <!-- <th
                      class="px-6 py-3 items-center space-x-2 cursor-pointer"
                      @click="userStore.changeSort('id')"
                    >
                      <span>ID</span>
                      <span v-if="userStore.sortBy === 'id'">
                        {{ userStore.order === 'asc' ? '⬆' : '⬇' }}
                      </span>
                    </th> -->

                    <th
                      class="px-6 py-3 items-center space-x-2 cursor-pointer"
                      @click="userStore.changeSort('username')"
                    >
                      <span>Course's name</span>
                      <span v-if="userStore.sortBy === 'username'">
                        {{ userStore.order === 'asc' ? '⬆' : '⬇' }}
                      </span>
                    </th>
                    <th class="px-6 py-3 items-center space-x-2">
                      <span> Level </span>
                    </th>
                    <th class="px-6 py-3 items-center space-x-2 cursor-pointer">
                      <span> Date </span>
                    </th>
                    <th class="px-6 py-3 items-center space-x-2 cursor-pointer">
                      <span> Price </span>
                    </th>
                    <th
                      class="px-6 py-3 items-center space-x-2 cursor-pointer"
                      @click="userStore.changeSort('isActive')"
                    >
                      <span class="flex items-center"> Status </span>
                      <span v-if="userStore.sortBy === 'isActive'">
                        {{ userStore.order === 'asc' ? '⬆' : '⬇' }}
                      </span>
                    </th>
                    <!-- <th scope="col" style="padding: 11px 20px" class="px-6 py-3">
                      <span class="flex items-center"> Actions </span>
                    </th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in courseEnrolledStore.listCourseEnrolled"
                    :key="item.id"
                    class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <!-- <RouterLink :to="{ name: 'user-detail-admin', params: { userId: item.id } }">
                      <td
                        class="px-6 py-4"
                        style="padding: 11px 20px; color: blue; text-decoration: underline"
                      >
                        {{ item.id }}
                      </td>
                    </RouterLink> -->
                    <td style="padding: 11px 20px" class="px-6 py-4">
                      {{ item.course.name }}
                    </td>
                    <td style="padding: 11px 20px" class="px-6 py-4">
                      <div
                        style="font-weight: bold"
                        :class="
                          (courseEnrolledStore.progressStatus[item.course.id] as string) ===
                          'Completed'
                            ? 'text-blue-500'
                            : 'text-green-500'
                        "
                      >
                        {{ courseEnrolledStore.progressList[item.course.id] }}
                        %
                      </div>
                    </td>
                    <td style="padding: 11px 20px" class="px-6 py-4">
                      {{ formatDate(item.enrollmentDate) }}
                    </td>
                    <td style="padding: 11px 20px" class="px-6 py-4">
                      {{ formatCurrencyWithRounding(item.course.price) }} VND
                    </td>
                    <td style="padding: 11px 20px" class="px-6 py-4">
                      <span
                        style="font-weight: bold"
                        :class="
                          (courseEnrolledStore.progressStatus[item.course.id] as string) ===
                          'Completed'
                            ? 'text-blue-500'
                            : 'text-green-500'
                        "
                      >
                        {{ courseEnrolledStore.progressStatus[item.course.id] }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { useCourseEnrolled } from '@/stores/CourseEnrolledStore'
import { useUserStore } from '@/stores/UserStore'
import { format } from 'date-fns'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = Number(route.params.userId)

const userStore = useUserStore()
const courseEnrolledStore = useCourseEnrolled()

const formatDate = (timestamp: number) => {
  try {
    const date = new Date(timestamp) // Chuyển đổi timestamp thành đối tượng Date
    return format(date, 'dd/MM/yyyy') // Định dạng ngày theo kiểu dd/MM/yyyy
  } catch (error) {
    console.error('Lỗi khi định dạng ngày: ', error)
    return 'Invalid date'
  }
}

const formatCurrencyWithRounding = (value: number) => {
  const roundedValue = Math.floor(value) + (value % 1 >= 0.5 ? 1 : 0)
  return roundedValue.toLocaleString().replace(/\B(?=(\d{3})+(?!))/g, ',')
}

onMounted(async () => {
  await userStore.loadUserById(userId)
  await userStore.countEnrollByUser(userId)
  await courseEnrolledStore.loadCoursesEnrolled(userId)

  for (const course of courseEnrolledStore.listCourseEnrolled) {
    await courseEnrolledStore.loadProgressByAdmin(userId, course.course?.id)
    // progress.value[course.course?.id] = res
    // console.log('2: ' + res)
  }
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

.format-user-general {
  background-color: #fbfbfb;
  border-radius: 10px;
  padding: 10px;
}

.format-icon-user {
  border-radius: 22px;
  display: flex;
  justify-content: center;
}
</style>
