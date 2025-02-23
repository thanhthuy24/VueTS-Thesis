<template>
  <main>
    <section class="bg-white dark:bg-gray-900">
      <div class="flex justify-between">
        <h1 class="mt-5 font-large">Review & Update Lesson</h1>
        <div class="mt-3">
          <router-link to="/admin/lesson-list-admin">
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              List lesson
            </button>
          </router-link>
        </div>
      </div>
      <div>
        <h1>Let's check your update today!!</h1>
      </div>
      <div class="border-style ml-7 mt-5">
        <div>
          <p class="font-large ml-6 my-5">Description</p>
        </div>
        <div>
          <form class="ml-6 mb-5" @submit.prevent="updateLesson">
            <div class="sm:col-span-2 mr-5">
              <label
                for="name"
                class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >Lesson Name: <span style="color: red">*</span></label
              >
              <input
                v-model="lessonStore.lesson.name"
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type your course name"
                required
              />
            </div>
            <div class="sm:col-span-2 mr-5">
              <label
                for="description"
                class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
                >Lesson Description: <span style="color: red">*</span></label
              >
              <textarea
                v-model="lessonStore.lesson.description"
                id="description"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
              ></textarea>
            </div>
            <div class="mb-5 mr-5 mt-5">
              <label
                class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
                for="image"
                >List Videos: <span style="color: red">*</span>
              </label>
              <div
                v-for="(item, id) in lessonStore.listVideos"
                :key="id"
                class="flex"
                style="display: flex; flex-wrap: wrap; gap: 10px"
              >
                <video
                  style="width: 280px; height: 180px; flex: 0 0 calc(33.33% - 10px)"
                  class="mr-5 mt-5 flex"
                  controls
                >
                  <source :src="item.name" type="video/mp4" />

                  Your browser does not support the video tag.
                </video>
                <div>
                  <div class="my-5">
                    <label
                      for="video-title"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Video Titles: <span style="color: red">*</span>
                    </label>
                    <input
                      type="text"
                      v-model="item.description"
                      class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="video-title"
                      placeholder="Enter video title"
                    />
                  </div>
                  <button
                    @click="updateTitleVideo(item.id, item.name, item.description)"
                    class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update title
                  </button>
                </div>
              </div>
            </div>

            <div class="mr-5">
              <label
                for="course"
                class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
                >Course: <span style="color: red">*</span></label
              >
              <select
                disabled
                id="course"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option v-for="(item, id) in courseStore.courses" :key="id" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <button
              style="width: 130px; margin-left: 87%"
              type="submit"
              class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>
<script lang="ts" setup>
import { authAPIs, endpoints } from '@/configs/APIs'
import { useCourseStore } from '@/stores/CourseStore'
import { useLessonStore } from '@/stores/LessonStore'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const lessonStore = useLessonStore()
const courseStore = useCourseStore()
const route = useRoute()
const lessonId = Number(route.params.lessonId)
const courseId = lessonStore.lesson?.course?.id

const updateLesson = async () => {
  const formData = new FormData()
  formData.append('name', lessonStore.lesson?.name)
  formData.append('description', lessonStore.lesson?.description)
  formData.append('courseId', courseId)
  try {
    await authAPIs().put(`${endpoints.lessons}/${lessonId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    toast.success('Update lesson successfully')
  } catch (err) {
    console.error(err)
  }
}

const updateTitleVideo = async (videoId: number, name: string, description: string) => {
  toast.success('Update title video successfully')
  const formData = new FormData()
  formData.append('name', name)
  formData.append('description', description)
  formData.append('lessonId', lessonId)

  try {
    await authAPIs().put(`${endpoints.lessons}/update-video/${videoId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    // toast.success('Update lesson successfully')
  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  await courseStore.loadCourseAdmin()
  await lessonStore.loadLessonById(lessonId)
  await lessonStore.loadListVideosByLessonId(lessonId)
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
</style>
