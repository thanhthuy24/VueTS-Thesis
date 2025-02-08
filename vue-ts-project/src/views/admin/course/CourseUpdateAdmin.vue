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
        <form class="ml-6 mb-5" @submit.prevent="updateCourse">
          <div class="sm:col-span-2 mr-5">
            <label
              for="name"
              class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
              >Course Name: <span style="color: red">*</span></label
            >
            <input
              v-model="courseStore.course.name"
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
              v-model="courseStore.course.description"
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
              >Course Image: <span style="color: red">*</span></label
            >
            <img :src="courseStore.course.image" class="w-52 h-52" />
          </div>
          <div class="mr-5">
            <label
              for="category"
              class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
              >Category: <span style="color: red">*</span></label
            >
            <select
              v-model="courseStore.category.id"
              id="category"
              @change="logCate"
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
              @change="logTag"
              v-model="courseStore.tag.id"
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
              @change="logTeacher"
              v-model="courseStore.teacher.id"
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
                v-model.number="courseStore.course.price"
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
                v-model="courseStore.course.discount"
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
            Update
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { authAPIs, endpoints } from '@/configs/APIs'
import { useCourseStore } from '@/stores/CourseStore'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useToast } from 'vue-toastification'
const route = useRoute()
const courseId = Number(route.params.courseId)

const toast = useToast()

const courseStore = useCourseStore()

const updateCourse = async () => {
  const formData = new FormData()
  formData.append('name', courseStore.course?.name)
  formData.append('description', courseStore.course?.description)
  formData.append('price', courseStore.course?.price.toString() || '')

  let discountFloat = 0.0
  if (discountFloat != null) {
    const parsedValue = parseFloat(courseStore.course?.discount?.toString() || '')
    if (!isNaN(parsedValue)) {
      discountFloat = parsedValue
    }
  }

  formData.append('discount', discountFloat)

  if (selectedCategoryName.value != null && selectedCategoryName.value !== undefined) {
    formData.append('categoryId', selectedCategoryName.value.toString())
  }

  // Check if tagId is not undefined or null
  if (selectedTagName.value != null && selectedTagName.value !== undefined) {
    formData.append('tagId', selectedTagName.value.toString())
  }

  // Check if teacherId is not undefined or null
  if (selectedTeacherName.value != null && selectedTeacherName.value !== undefined) {
    formData.append('teacherId', selectedTeacherName.value.toString())
  }

  try {
    await authAPIs().put(`${endpoints.courses}/${courseId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    notify()
  } catch (err) {
    console.error(err)
  }
}

const selectedCategoryName = computed(() => {
  const selectedCategory = courseStore.categories.find(
    (item) => item.id === courseStore.category.id,
  )
  return selectedCategory ? selectedCategory.id : 'Not selected'
})

const selectedTagName = computed(() => {
  const selectedTag = courseStore.tags.find((item) => item.id === courseStore.tag.id)
  return selectedTag ? selectedTag.id : 'Not selected'
})

const selectedTeacherName = computed(() => {
  const selectedTeacher = courseStore.teachers.find((item) => item.id === courseStore.teacher.id)
  return selectedTeacher ? selectedTeacher.id : 'Not selected'
})

// Hàm log khi chọn category mới
const logCate = () => {
  console.log('Selected Category:', selectedCategoryName.value)
}

const logTag = () => {
  console.log('Selected Category:', selectedTagName.value)
}

const logTeacher = () => {
  console.log('Selected Category:', selectedTeacherName.value)
}

const notify = () => {
  toast.success('Course has been updated sucessfully!!')
}

onMounted(async () => {
  await courseStore.loadCourseById(courseId)
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
