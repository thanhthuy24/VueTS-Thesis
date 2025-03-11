<template>
  <!-- Carolsel -->
  <section>
    <div id="default-carousel" class="relative w-full" data-carousel="slide">
      <!-- Carousel wrapper -->
      <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
        <!-- Item 1 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="/src/assets/carousel/caro5.jpg"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="/src/assets/carousel/caro1.jpg"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
        <!-- Item 3 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="/src/assets/carousel/caro2.jpg"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
        <!-- Item 4 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="/src/assets/carousel/caro3.jpg"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
        <!-- Item 5 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="/src/assets/carousel/caro4.jpg"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
      </div>
      <!-- Slider indicators -->
      <div
        class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse"
      >
        <button
          type="button"
          class="w-3 h-3 rounded-full"
          aria-current="true"
          aria-label="Slide 1"
          data-carousel-slide-to="0"
        ></button>
        <button
          type="button"
          class="w-3 h-3 rounded-full"
          aria-current="false"
          aria-label="Slide 2"
          data-carousel-slide-to="1"
        ></button>
        <button
          type="button"
          class="w-3 h-3 rounded-full"
          aria-current="false"
          aria-label="Slide 3"
          data-carousel-slide-to="2"
        ></button>
        <button
          type="button"
          class="w-3 h-3 rounded-full"
          aria-current="false"
          aria-label="Slide 4"
          data-carousel-slide-to="3"
        ></button>
        <button
          type="button"
          class="w-3 h-3 rounded-full"
          aria-current="false"
          aria-label="Slide 5"
          data-carousel-slide-to="4"
        ></button>
      </div>
      <!-- Slider controls -->
      <button
        type="button"
        class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>
  </section>
  <!-- Aside -->
  <section class="flex">
    <aside
      style="height: 1000px"
      id="default-sidebar"
      class="z-40 w-64 transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
          <li v-for="cate in courseStore.categories" :key="cate.id">
            <a
              @click="courseStore.filterCate(cate.id)"
              style="cursor: pointer"
              class="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="ms-3">{{ cate.name }}</span>
            </a>
          </li>
        </ul>
        <hr />
        <div class="space-y-2 mt-3">
          <h6 class="ml-8 text-base font-medium text-black dark:text-white">Filter Prices</h6>
          <div class="">
            <div class="w-full my-3">
              <label
                for="min-experience-input"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                From
              </label>

              <input
                type="number"
                id="price-from"
                v-model="minPrice"
                min="1"
                max="10000"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Exp: 3000"
                required
              />
            </div>

            <div class="w-full">
              <label
                for="price-to"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                To
              </label>

              <input
                type="number"
                id="max-experience-input"
                v-model="maxPrice"
                min="1"
                max="10000"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Exp: 4500"
                required
              />
            </div>
            <div class="my-3">
              <button
                type="button"
                @click="courseStore.filterPrice(minPrice, maxPrice)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <div class="p-4">
      <div class="mb-5">
        <div>
          <p>Các khóa học gợi ý cho bạn</p>
        </div>
        <div>
          <div id="course-carousel" class="relative w-full" data-carousel="slide">
            <!-- Carousel wrapper -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div
                v-for="c in courseStore.recommendCourses"
                :key="c.id"
                class="flex-courses bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <RouterLink :to="{ name: 'course-detail', params: { courseId: c.id } }">
                  <a> <img class="rounded-t-lg image-tital-course" :src="c.image" alt="" /> </a
                ></RouterLink>
                <div class="p-5 flex-grow">
                  <!-- <a href="#"> -->
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {{ c.name }}
                  </h5>
                  <!-- </a> -->
                  <div class="my-2">
                    <span
                      class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300"
                      >{{ c.teacher.user.username }}</span
                    >
                  </div>

                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {{ toggleReadMore ? c.description : `${c.description.slice(0, maxLength)}...`
                    }}<span class="text-blue-600"> Read more</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Slider indicators -->
            <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
              <button
                v-for="(course, index) in courseStore.recommendCourses"
                :key="'indicator-' + index"
                type="button"
                class="w-3 h-3 rounded-full bg-white"
                :data-carousel-slide-to="index"
              ></button>
            </div>

            <!-- Slider controls -->
            <button
              type="button"
              class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
            >
              <span
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30"
              >
                <svg
                  class="w-4 h-4 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </span>
            </button>
            <button
              type="button"
              class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
            >
              <span
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30"
              >
                <svg
                  class="w-4 h-4 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div
        class="mb-5 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div
          v-for="c in courseStore.courses"
          :key="c.id"
          class="flex-courses max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <RouterLink :to="{ name: 'course-detail', params: { courseId: c.id } }">
            <a> <img class="rounded-t-lg image-tital-course" :src="c.image" alt="" /> </a
          ></RouterLink>
          <div class="p-5 flex-grow">
            <!-- <a href="#"> -->
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ c.name }}
            </h5>
            <!-- </a> -->
            <div class="my-2">
              <span
                class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300"
                >{{ c.teacher.user.username }}</span
              >
            </div>

            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {{ toggleReadMore ? c.description : `${c.description.slice(0, maxLength)}...`
              }}<span class="text-blue-600"> Read more</span>
            </p>
            <div
              v-if="loginStore.isLoggedIn === false"
              style="margin-left: 24%"
              class="bg-purple-100 text-purple-800 text-xs font-medium me-2 w-36 px-2 py-2 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400"
            >
              <p>LOGIN TO SEE DETAIL</p>
            </div>
            <div v-else class="flex justify-around">
              <div>
                <span
                  class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#343C54"
                    xmlns="http://www.w3.org/2000/svg"
                    transform="rotate(0 0 0)"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.25 5C7.83579 5 7.5 5.33579 7.5 5.75V9.75C7.5 10.1642 7.83579 10.5 8.25 10.5H15.75C16.1642 10.5 16.5 10.1642 16.5 9.75V5.75C16.5 5.33579 16.1642 5 15.75 5H8.25ZM9 9V6.5H15V9H9Z"
                      fill="#343C54"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.75 2C5.50736 2 4.5 3.00736 4.5 4.25V19C4.5 20.6569 5.84315 22 7.5 22H18.75C19.1642 22 19.5 21.6642 19.5 21.25C19.5 20.8358 19.1642 20.5 18.75 20.5H18V17.5H18.75C19.1642 17.5 19.5 17.1642 19.5 16.75V4.25C19.5 3.00736 18.4926 2 17.25 2H6.75ZM18 16V4.25C18 3.83579 17.6642 3.5 17.25 3.5H6.75C6.33579 3.5 6 3.83579 6 4.25V16.4013C6.44126 16.1461 6.95357 16 7.5 16H18ZM16.5 17.5V20.5H7.5C6.67157 20.5 6 19.8284 6 19C6 18.1716 6.67157 17.5 7.5 17.5H16.5Z"
                      fill="#343C54"
                    />
                  </svg>
                  {{ courseStore.countLesson[c.id] }} lessons
                </span>
              </div>
              <div>
                <span
                  class="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
                >
                  <svg
                    class="w-2.5 h-2.5 me-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"
                    />
                  </svg>
                  {{ courseStore.countEnrolled[c.id] }} students
                </span>
              </div>
            </div>
            <!-- </div> -->
            <div class="flex justify-between mt-3">
              <div
                style="text-decoration: line-through"
                class="p-4 text-sm mb-4 font-bold text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                role="alert"
              >
                {{ formatCurrencyWithRounding(c.price) }} VNĐ
              </div>
              <div>
                <svg
                  class="mt-2"
                  width="40"
                  height="40"
                  viewBox="0 0 25 25"
                  fill="#343C54"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="rotate(0 0 0)"
                >
                  <path
                    d="M6.4228 18.2197C6.1299 18.5126 6.1299 18.9874 6.4228 19.2803C6.71569 19.5732 7.19056 19.5732 7.48346 19.2803L13.7335 13.0303C14.0263 12.7374 14.0263 12.2626 13.7335 11.9697L7.48346 5.71967C7.19056 5.42678 6.71569 5.42678 6.42279 5.71967C6.1299 6.01256 6.1299 6.48744 6.42279 6.78033L12.1425 12.5L6.4228 18.2197Z"
                    fill="#343C54"
                  />
                  <path
                    d="M10.9228 18.2197C10.6299 18.5126 10.6299 18.9874 10.9228 19.2803C11.2157 19.5732 11.6906 19.5732 11.9835 19.2803L18.2335 13.0303C18.5263 12.7374 18.5263 12.2626 18.2335 11.9697L11.9835 5.71967C11.6906 5.42678 11.2157 5.42678 10.9228 5.71967C10.6299 6.01256 10.6299 6.48744 10.9228 6.78033L16.6425 12.5L10.9228 18.2197Z"
                    fill="#343C54"
                  />
                </svg>
              </div>
              <div
                class="text-red-600 font-bold p-4 mb-4 text-sm rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {{ formatCurrencyWithRounding(c.price * (1 - c.discount / 100)) }} VNĐ
              </div>
            </div>
          </div>
          <!-- @click="cartStore.addToCart(c)" -->
          <a
            @click="cartStore.addToCart(c, loginStore.currentUser?.id, loginStore.token)"
            style="cursor: pointer"
            class="mt-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <span class="ml-24">Add to cart</span>
            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
          <!-- </div> -->
        </div>
      </div>
      <PaginationLayout
        :currentPage="courseStore.page"
        :totalPage="courseStore.totalPages"
        @page-change="handlePageChange"
      />
    </div>
  </section>
  <!-- Courses view -->
  <section></section>
</template>
<script setup lang="ts">
// import APIs, { endpoints } from '@/configs/APIs'
import { useCourseStore } from '@/stores/CourseStore'
import { useLoginStore } from '@/stores/LoginStore'
import { onMounted, ref } from 'vue'
import PaginationLayout from './pagination/PaginationLayout.vue'
import { useCartStore } from '@/stores/CartStore'
import { RouterLink } from 'vue-router'
// import { authAPIs, endpoints } from '@/configs/APIs'

const courseStore = useCourseStore()
const loginStore = useLoginStore()
const cartStore = useCartStore()

const handlePageChange = async (newPage: number) => {
  await courseStore.changePage(newPage)
}

const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)

const formatCurrencyWithRounding = (value: number) => {
  const roundedValue = Math.floor(value) + (value % 1 >= 0.5 ? 1 : 0)
  return roundedValue.toLocaleString().replace(/\B(?=(\d{3})+(?!))/g, ',')
}

// another functions
const maxLength = 100
const toggleReadMore = ref(false)

// const carouselRef = ref<HTMLElement | null>(null)
// const carouselInstance: Carousel | null = null

// // Chuyển đến slide tiếp theo
// const nextSlide = () => {
//   carouselInstance?.next()
// }

// // Chuyển đến slide trước đó
// const prevSlide = () => {
//   carouselInstance?.prev()
// }

// run function
onMounted(async () => {
  await courseStore.loadCates()
  await courseStore.loadCourses()
  await courseStore.loadCoursesByPrice()
  await courseStore.loadRecommendationCourses(loginStore.currentUser.id)
  // if (carouselRef.value) {
  //   carouselInstance = new Carousel(carouselRef.value)
  // }
})
</script>

<style scoped>
.image-tital-course {
  width: 100%; /* Chiều rộng full container */
  height: 300px; /* Chiều cao cố định (tuỳ chỉnh theo nhu cầu) */
  object-fit: cover; /* Ảnh được cắt để vừa thẻ, giữ tỷ lệ */
  object-position: center; /* Định vị trung tâm ảnh */
  border-top-left-radius: 0.5rem; /* Đảm bảo bo góc giống thẻ cha */
  border-top-right-radius: 0.5rem;
}

.flex-courses {
  display: flex; /* Sử dụng flexbox */
  flex-direction: column; /* Chia theo chiều dọc */
  height: 100%; /* Chiều cao full */
}

.flex-grow {
  flex-grow: 1; /* Đẩy nội dung bên trên chiếm khoảng trống */
}

.mt-auto {
  margin-top: auto; /* Đẩy button xuống cuối */
}
</style>
