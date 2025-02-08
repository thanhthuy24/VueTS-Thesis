<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="flex justify-between">
      <h1 class="mt-5 font-large">Add Course</h1>
      <div class="mt-3">
        <button
          type="button"
          class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <router-link to="/admin/course-list-admin">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            List courses
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
        <form class="ml-6 mb-5" @submit.prevent="createCourse">
          <div class="sm:col-span-2 mr-5">
            <label
              for="name"
              class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
              >Course Name: <span style="color: red">*</span></label
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
              >Course Description: <span style="color: red">*</span></label
            >
            <textarea
              v-model="description"
              id="description"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Your description here"
            ></textarea>
          </div>
          <div class="mb-5 mr-5">
            <label
              class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
              for="image"
              >Course Image: <span style="color: red">*</span></label
            >
            <input
              @change="handleFileUpload"
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              id="avatar"
              type="file"
              required
            />
          </div>
          <div class="mr-5">
            <label
              for="category"
              class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
              >Category: <span style="color: red">*</span></label
            >
            <select
              v-model="categoryId"
              id="category"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option v-for="(item, id) in courseStore.categories" :key="id" :value="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="mr-5">
            <label
              for="tag"
              class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
              >Tag: <span style="color: red">*</span></label
            >
            <select
              v-model="tagId"
              id="tag"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option v-for="(item, id) in courseStore.tags" :key="id" :value="item.id" selected>
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="mr-5">
            <label
              for="teacher"
              class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
              >Teacher: <span style="color: red">*</span></label
            >
            <select
              v-model="teacherId"
              id="teacher"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option
                v-for="(item, id) in courseStore.teachers"
                :value="item.id"
                :key="id"
                selected
              >
                {{ item.user?.firstName }} {{ item.user?.lastName }}
              </option>
            </select>
          </div>
          <div class="flex">
            <div class="w-full">
              <label
                for="price"
                class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
                >Price: <span style="color: red">*</span></label
              >
              <input
                v-model.number="price"
                type="number"
                name="price"
                style="width: 350px"
                id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="VND"
                required
              />
            </div>
            <div class="w-full">
              <label
                for="discount"
                class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
                >Discount: <span style="color: red">*</span></label
              >
              <input
                v-model="discount"
                type="number"
                step="0.01"
                name="discount"
                style="width: 350px"
                id="discount"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="%"
                required
              />
            </div>
          </div>

          <button
            style="width: 130px; margin-left: 87%"
            type="submit"
            class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { authAPIs, endpoints } from '@/configs/APIs'
import { useCourseStore } from '@/stores/CourseStore'
import { onMounted, ref } from 'vue'

import { useToast } from 'vue-toastification'

const toast = useToast()

const courseStore = useCourseStore()

const name = ref<string>('')
const description = ref<string>('')
const price = ref<number | null>(null)
const discount = ref<number | null>(null)
const categoryId = ref<number | null>(null)
const file = ref<File | string>('')
const tagId = ref<number | null>(null)
const teacherId = ref<number | null>(null)
const image = ref<string | File>('')

const createCourse = async () => {
  const formData = new FormData()

  formData.append('name', name.value)
  formData.append('description', description.value)
  formData.append('price', price.value?.toString() || '')

  let discountFloat = 0.0
  if (discountFloat != null) {
    const parsedValue = parseFloat(q.value?.toString() || '')
    if (!isNaN(parsedValue)) {
      discountFloat = parsedValue
    }
  }

  formData.append('discount', (discountFloat ?? 0).toString())
  if (categoryId.value != null && categoryId.value !== undefined) {
    formData.append('categoryId', categoryId.value.toString())
  } else {
    console.error('categoryId is invalid:', categoryId.value)
  }

  // Check if tagId is not undefined or null
  if (tagId.value != null && tagId.value !== undefined) {
    formData.append('tagId', tagId.value.toString())
  }

  // Check if teacherId is not undefined or null
  if (teacherId.value != null && teacherId.value !== undefined) {
    formData.append('teacherId', teacherId.value.toString())
  }

  if (image.value) {
    formData.append('file', image.value)
  }

  try {
    await authAPIs().post(endpoints.courses, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    name.value = ''
    description.value = ''
    discount.value = null
    categoryId.value = null
    file.value = ''
    tagId.value = null
    teacherId.value = null
    price.value = null
    image.value = ''
    file.value = ''
    notify()
  } catch (err) {
    console.error(err)
    toast.error('Course has been failed. Please check again!!')
  }
}

const notify = () => {
  toast.success('Course has been created sucessfully!!')
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    image.value = target.files[0]
  } else {
    image.value = ''
  }
  console.log(image.value)
}

// const logCategory = () => {
//   console.log('Selected Category:', categoryId.value)
// }

// const logTag = () => {
//   console.log('Selected Category:', tagId.value)
// }

// const logTeacher = () => {
//   console.log('Selected Category:', teacherId.value)
// }

onMounted(async () => {
  await courseStore.loadCates()
  await courseStore.loadTags()
  await courseStore.loadTeachers()
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
