<template>
  <main>
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div class="flex mx-auto max-w-screen-xl px-4 2xl:px-0 justify-around">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Reviews</h2>

            <div class="mt-2 flex items-center gap-2 sm:mt-0">
              <div class="flex items-center gap-0.5">
                <svg
                  v-for="n in Math.floor(courseEnrolled.averageRating)"
                  :key="n"
                  class="h-6 w-6 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>

                <svg
                  v-if="courseEnrolled.averageRating % 1 >= 0.5"
                  class="h-6 w-6 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <defs>
                    <linearGradient id="half">
                      <stop offset="50%" stop-color="currentColor" />
                      <stop offset="50%" stop-color="transparent" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                    fill="url(#half)"
                  />
                </svg>
              </div>
              <p class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                ({{ courseEnrolled.averageRating }})
              </p>
              <a
                href="#"
                class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
              >
                {{ courseEnrolled.countRatingAll }} Reviews
              </a>
            </div>
          </div>

          <div class="my-6 gap-8 sm:flex sm:items-start md:my-8">
            <div class="shrink-0 space-y-4">
              <p class="text-2xl font-semibold leading-none text-gray-900 dark:text-white">
                {{ courseEnrolled.averageRating }} out of 5
              </p>
              <button
                type="button"
                data-modal-target="review-modal"
                data-modal-toggle="review-modal"
                class="mb-2 me-2 rounded-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Write a review
              </button>
            </div>

            <div class="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
              <div class="flex items-center gap-2" v-for="starCount in 5" :key="starCount">
                <p
                  class="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white"
                >
                  {{ 6 - starCount }}
                </p>
                <svg
                  class="h-4 w-4 shrink-0 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <div class="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    class="h-1.5 rounded-full bg-yellow-300"
                    :style="{ width: courseEnrolled.averagePerRate[6 - starCount] + '%' }"
                  ></div>
                </div>
                <a
                  href="#"
                  class="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                >
                  {{ courseEnrolled.countPerRate[6 - starCount] }}
                  <span class="hidden sm:inline">reviews</span></a
                >
              </div>
            </div>
          </div>
        </div>
        <div style="margin-left: 10%">
          <div>
            <p>Hiển thị các đánh giá!</p>
            <div>
              <div class="flex flex-wrap gap-2 p-4 bg-gray-100 rounded-lg">
                <button
                  v-for="filter in filters"
                  :key="filter.value"
                  @click="handleFilter(filter.value)"
                  class="px-4 py-2 rounded border"
                  :class="
                    selected === filter.value
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-200'
                  "
                >
                  {{ filter.label }}
                </button>
              </div>
            </div>
          </div>
          <div
            v-for="(item, index) in courseEnrolled.review"
            :key="index"
            class="mt-6 divide-y divide-gray-200 dark:divide-gray-700"
          >
            <div class="gap-3 pb-6 sm:flex sm:items-start">
              <div class="shrink-0 space-y-2 sm:w-48 md:w-72">
                <div class="flex items-center gap-0.5">
                  <svg
                    v-for="n in item.rating"
                    :key="n"
                    class="h-4 w-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                    />
                  </svg>
                </div>

                <div class="space-y-0.5">
                  <p class="text-base font-semibold text-gray-900 dark:text-white">
                    {{ item.user?.username }}
                  </p>
                  <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {{ formatDateUpdate(item.ratingDate) }}
                  </p>
                  <!-- November 18 2023 at 15:35 -->
                </div>

                <div class="inline-flex items-center gap-1">
                  <svg
                    class="h-5 w-5 text-primary-700 dark:text-primary-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">Verified purchase</p>
                </div>
              </div>

              <div class="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                  {{ item.comment }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaginationLayout
        style="margin-left: 65%"
        :currentPage="courseEnrolled.pageReviews"
        :totalPage="courseEnrolled.totalPagesReview"
        @page-change="handlePageChange"
      />
    </section>
    <div
      id="review-modal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 antialiased"
    >
      <div class="relative max-h-full w-full max-w-2xl p-4">
        <!-- Modal content -->
        <div class="relative rounded-lg bg-white shadow dark:bg-gray-800">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700 md:p-5"
          >
            <div>
              <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                Add a review for:
              </h3>
              <a
                href="#"
                class="font-medium text-primary-700 hover:underline dark:text-primary-500"
              >
                {{ courseStore.course.name }}
              </a>
            </div>
            <button
              type="button"
              class="absolute right-5 top-5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="review-modal"
            >
              <svg
                class="h-3 w-3"
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
          </div>
          <!-- Modal body -->
          <form
            class="p-4 md:p-5"
            @submit.prevent="courseEnrolled.addReview(comment, rating, courseId)"
          >
            <div class="mb-4 grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <div class="flex items-center">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    @click="setRating(star)"
                    :class="star <= rating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'"
                    class="h-6 w-6 cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <span class="ms-2 text-lg font-bold text-gray-900 dark:text-white"
                    >{{ rating }} out of 5</span
                  >
                </div>
              </div>
              <div class="col-span-2">
                <label
                  for="description"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >Review description</label
                >
                <textarea
                  v-model="comment"
                  id="description"
                  rows="6"
                  class="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                ></textarea>
                <p class="ms-auto text-xs text-gray-500 dark:text-gray-400">
                  Problems with the product or delivery?
                  <a href="#" class="text-primary-600 hover:underline dark:text-primary-500"
                    >Send a report</a
                  >.
                </p>
              </div>
            </div>
            <div class="border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
              <button
                type="submit"
                data-modal-toggle="review-modal"
                class="mb-2 me-2 rounded-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Add review
              </button>
              <button
                type="button"
                data-modal-toggle="review-modal"
                class="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { useCourseEnrolled } from '@/stores/CourseEnrolledStore'
import { useCourseStore } from '@/stores/CourseStore'
import { useLoginStore } from '@/stores/LoginStore'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import PaginationLayout from '../pagination/PaginationLayout.vue'

const handlePageChange = async (newPage: number) => {
  await courseEnrolled.changePageReview(newPage, courseId)
}

const selected = ref<string>('all')
const filters = [
  { label: 'Tất Cả', value: 'all' },
  { label: '5 Sao', value: 5 },
  { label: '4 Sao', value: 4 },
  { label: '3 Sao', value: 3 },
  { label: '2 Sao', value: 2 },
  { label: '1 Sao', value: 1 },
  { label: 'Đánh Giá Tích Cực', value: 'Positive' },
  { label: 'Đánh Giá Tiêu Cực', value: 'Negative' },
]

const handleFilter = (value: string) => {
  selected.value = value
  if (value === 'Positive' || value === 'Negative') {
    courseEnrolled.filterSentiment(value, courseId)
  } else if (value === 'all') {
    courseEnrolled.filterSentiment('', courseId)
  } else {
    courseEnrolled.filterRate(Number(value), courseId)
  }
}

const route = useRoute()
const courseIdParam = route.params.courseId
const courseId = Number(courseIdParam)
const comment = ref('')

const formatDateUpdate = (timestamp: number) => {
  try {
    const date = new Date(timestamp) // Chuyển đổi timestamp thành đối tượng Date
    const options = { month: 'short', day: '2-digit', year: 'numeric' }
    const formattedDate = date.toLocaleDateString('en-US', options)
    return formattedDate
  } catch (error) {
    console.error('Lỗi khi định dạng ngày: ', error)
    return 'Invalid date'
  }
}

const rating = ref(0)
const setRating = (star: number) => {
  rating.value = star
  // console.log(rating.value);
}

const courseEnrolled = useCourseEnrolled()
const courseStore = useCourseStore()
const loginStore = useLoginStore()

const userId = Number(loginStore.currentUser?.id)

onMounted(async () => {
  await courseEnrolled.checkCourseEnrolled(userId, courseId)
  await courseEnrolled.loadAverageRating(courseId)
  await courseEnrolled.loadCountRatingAll(courseId)
  await courseEnrolled.loadReviews(courseId)
  await courseStore.loadCourseById(courseId)

  for (let star = 1; star <= 5; star++) {
    await courseEnrolled.loadCountPerRate(courseId, star)
    await courseEnrolled.loadAveragePerRate(courseId, star)
  }
})
</script>
