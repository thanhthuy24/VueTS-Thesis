<template>
  <main>
    <section class="bg-white dark:bg-gray-900">
      <div class="flex justify-between">
        <h1 class="mt-5 font-large">Add Lesson for course {{ courseId }}</h1>
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
          <form class="ml-6 mb-5" @submit.prevent="createLesson">
            <div class="sm:col-span-2 mr-5">
              <label
                for="name"
                class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >Lesson Name: <span style="color: red">*</span></label
              >
              <input
                v-model="name"
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
                v-model="description"
                id="description"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
              ></textarea>
            </div>
            <!-- <div class="mb-5 mr-5 mt-5">
              <label
                class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
                for="image"
                >List Videos: <span style="color: red">*</span></label
              >
              <div class="flex" style="display: flex; flex-wrap: wrap; gap: 10px">
                <video
                  v-for="(item, id) in videos"
                  :key="id"
                  style="width: 280px; height: 180px; flex: 0 0 calc(33.33% - 10px)"
                  class="mr-5"
                  controls
                >
                  <source :src="item.name" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div> -->
            <div class="my-5">
              <label
                for="file-upload"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Upload Video Files: <span style="color: red">*</span>
              </label>
              <input
                @change="handleFileUpload"
                type="file"
                multiple
                accept=".mp4"
                class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file-upload"
              />
              <label style="color: red; font-size: small; font-weight: bold">
                Tối đa 5 file .mp4, dung lượng không quá 20MB
              </label>
              <div v-if="errorMessage" class="text-red-500 mt-2">---{{ errorMessage }}</div>
            </div>
            <div class="my-5">
              <label
                for="video-title"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Video Titles: <span style="color: red">*</span>
              </label>
              <input
                v-model="videoTitle"
                type="text"
                class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="video-title"
                placeholder="Enter video title"
              />
            </div>
            <div class="mr-5">
              <label
                for="course"
                class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
                >Course: <span style="color: red">*</span></label
              >
              <select
                disabled
                v-model="courseId"
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
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const route = useRoute()
const courseId = Number(route.params.courseId)

const courseStore = useCourseStore()

const name = ref<string>('')
const description = ref<string>('')
const lessonId = ref<number>(0)
const files = ref<File[] | string>([])
const videos = ref<File[] | string>([])
const videoTitle = ref<string>('')

const createLesson = async () => {
  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('description', description.value)
  formData.append('courseId', courseId.toString())

  try {
    const res = await authAPIs().post(endpoints.lessons, formData, {
      headers: {
        'Contain-Type': 'multipart/form-data',
      },
    })
    lessonId.value = res.data.id
    uploadVideos(lessonId.value)
    name.value = ''
    description.value = ''
    files.value = []
    videos.value = []
    videoTitle.value = ''
    toast.success('Create lesson successfully')
  } catch (err) {
    console.error(err)
  }
}

const uploadVideos = async (id: number) => {
  const formData = new FormData()
  for (let i = 0; i < videos.value.length; i++) {
    formData.append('files', videos.value[i])
  }
  formData.append('description', videoTitle.value)

  try {
    await authAPIs().post(`${endpoints.lessons}/uploads/${id}`, formData, {
      headers: {
        'Contain-Type': 'multipart/form-data',
      },
    })
    console.log(videos.value)
  } catch (err) {
    console.log(err)
  }
}

const errorMessage = ref<string>('')

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement

  const maxFileSize = 20 * 1024 * 1024 // 20MB
  const validFileTypes = ['video/mp4']

  const selectedFiles = target.files

  if (!selectedFiles || selectedFiles.length > 5) {
    errorMessage.value = 'You can only upload up to 5 files'
    return
  }
  for (let i = 0; i < files.value.length; i++) {
    if (selectedFiles[i].size > maxFileSize) {
      errorMessage.value = 'File size must be less than 20MB'
      return
    }
    if (!validFileTypes.includes(selectedFiles[i].type)) {
      errorMessage.value = 'File type must be .mp4'
      return
    }
  }
  videos.value = selectedFiles
  console.log(videos.value)
}

onMounted(async () => {
  await courseStore.loadCourseAdmin()
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
