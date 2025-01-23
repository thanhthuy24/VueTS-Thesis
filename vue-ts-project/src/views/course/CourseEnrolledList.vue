<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          My Collections
        </h2>
        <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
          The courses you've invested in are not just about knowledge; they are gateways to new
          opportunities. Turn each lesson into a step forward towards becoming the best version of
          yourself!
        </p>
      </div>
      <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
        <!-- <div>5454</div> -->
        <div
          v-for="item in courseEnrolled.courseList"
          :key="item.id"
          class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
        >
          <RouterLink :to="{ name: 'course-enrolled', params: { courseId: item.course.id } }">
            <a>
              <img
                class="rounded-lg sm:rounded-none sm:rounded-l-lg image-tital-course"
                :src="item.course?.image"
                alt="Bonnie Avatar"
              /> </a
          ></RouterLink>
          <div class="p-5">
            <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              <a href="#">{{ item.course.name }}</a>
            </h3>
            <span class="text-gray-500 dark:text-gray-400">{{
              item.course?.teacher?.user?.username
            }}</span>
            <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
              {{ formatDateTime(item.enrollmentDate) }}
            </p>
            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                :style="{
                  width: progress[item.course.id] ? progress[item.course.id] + '%' : '5%',
                }"
              >
                {{ progress[item.course.id] }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { useCourseEnrolled } from '@/stores/CourseEnrolledStore'
import { onMounted, ref } from 'vue'

const courseEnrolled = useCourseEnrolled()

// chuyển đổi number -> date time
const formatDateTime = (date: number) => {
  const datetime = new Date(date)
  const day = datetime.getDate().toString().padStart(2, '0')
  const month = (datetime.getMonth() + 1).toString().padStart(2, '0')
  const year = datetime.getFullYear()
  return `${day}/${month}/${year}`
}

const progress = ref<Record<number, number>>({})

onMounted(async () => {
  await courseEnrolled.loadCourseList()

  for (const course of courseEnrolled.courseList) {
    const res = await courseEnrolled.loadProcess(course.course.id)
    progress.value[course.course.id] = res
    console.log('--------' + course.course.id + ' .... ' + res)
  }

  // courseEnrolled.courseList.forEach(async (course) => {})
})
</script>
<style scoped>
.image-tital-course {
  width: 100%;
  height: 300px; /* Chiều cao cố định (tuỳ chỉnh theo nhu cầu) */
  object-fit: cover; /* Ảnh được cắt để vừa thẻ, giữ tỷ lệ */
  object-position: center; /* Định vị trung tâm ảnh */
}
</style>
