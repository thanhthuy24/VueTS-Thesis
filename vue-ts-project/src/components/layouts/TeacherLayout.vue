<template>
  <TeacherHeader />
  <!-- <h1>teacher</h1> -->
  <section class="admin-layout p-4 mt-16">
    <div class="p-4">
      <div
        class="mb-5 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div
          v-for="c in courseStore.coursesForTeacher"
          :key="c.id"
          class="flex-courses max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <RouterLink :to="{ name: 'teacher-layout-course', params: { courseId: c.id } }">
            <a> <img class="rounded-t-lg image-tital-course" :src="c.image" alt="" /> </a>
          </RouterLink>
          <div class="p-5 flex-grow">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ c.name }}
            </h5>
            <!-- </a> -->
            <div class="my-2">
              <span
                class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300"
              >
                {{ c.teacher.user.username }}
              </span>
            </div>

            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {{ toggleReadMore ? c.description : `${c.description.slice(0, maxLength)}...` }}
              <span class="text-blue-600"> Read more</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <PaginationLayout
        :currentPage="courseStore.page"
        :totalPage="courseStore.totalPagesTeacher"
        @page-change="handlePageChange"
      />
    </div>
  </section>
</template>
<script lang="ts" setup>
import { useCourseStore } from '@/stores/CourseStore'
import TeacherHeader from '../headers/TeacherHeader.vue'
import { onMounted, ref } from 'vue'
import { useLoginStore } from '@/stores/LoginStore'
import { useUserStore } from '@/stores/UserStore'
import PaginationLayout from '@/views/pagination/PaginationLayout.vue'

const courseStore = useCourseStore()
const userStore = useUserStore()
const loginStore = useLoginStore()
const userId = Number(loginStore.currentUser?.id)

const handlePageChange = async (newPage: number) => {
  await courseStore.changePageCourseTeacher(newPage, userStore.checkTeacher.id)
  // await courseStore.loadCoursesForTeacher()
}

const maxLength = 100
const toggleReadMore = ref(false)

onMounted(async () => {
  await userStore.loadTeacher(userId)
  if (userStore.checkTeacher) {
    await courseStore.loadCoursesForTeacher(userStore.checkTeacher.id)
  }
})
</script>
<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

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
