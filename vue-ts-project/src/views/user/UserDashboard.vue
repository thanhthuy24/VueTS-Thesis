<template>
  <section class="flex-container container">
    <section class="flex-item-2 border-div-1">
      <div style="display: flex; justify-content: center">
        <img :src="loginStore.currentUser?.avatar" class="rounded-full w-56 h-56 mx-5 my-5" />
      </div>

      <div class="w-full flex justify-center">
        <button
          type="button"
          class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Change your avatar
        </button>
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Change your password
        </button>
      </div>
      <hr />
      <div>
        <ul class="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
          <li>
            <a
              @click="toggleChangeAvatar"
              style="cursor: pointer"
              class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="mr-2 w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path
                  d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z"
                />
              </svg>
              Change your avatar
            </a>
          </li>
          <li>
            <a
              @click="toggleChangePassword"
              style="cursor: pointer"
              class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="mr-2 w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="m1.56 6.245 8 3.924a1 1 0 0 0 .88 0l8-3.924a1 1 0 0 0 0-1.8l-8-3.925a1 1 0 0 0-.88 0l-8 3.925a1 1 0 0 0 0 1.8Z"
                />
                <path
                  d="M18 8.376a1 1 0 0 0-1 1v.163l-7 3.434-7-3.434v-.163a1 1 0 0 0-2 0v.786a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.786a1 1 0 0 0-1-1Z"
                />
                <path
                  d="M17.993 13.191a1 1 0 0 0-1 1v.163l-7 3.435-7-3.435v-.163a1 1 0 1 0-2 0v.787a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.787a1 1 0 0 0-1-1Z"
                />
              </svg>
              Change your password
            </a>
          </li>
        </ul>
      </div>
    </section>
    <section class="flex-item-3">
      <div class="border-div-1">
        <div v-if="isChangePassword">55555</div>
        <div v-if="isChangeAvatar">
          <file-pond
            ref="pond"
            name="file"
            :allow-multi="false"
            :accepted-file-types="['image/png', 'image/jpeg']"
            :server="handleChangeAvatar"
            label-idle="Kéo và thả file"
          />
        </div>
        <div v-else class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">User's information</h2>
          <form action="#">
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Email</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type email"
                  v-model="loginStore.currentUser.email"
                />
              </div>
              <div class="w-full">
                <label
                  for="firstname"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >First name</label
                >
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="First name"
                  v-model="loginStore.currentUser.firstName"
                />
              </div>
              <div class="w-full">
                <label
                  for="lastname"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Last name</label
                >
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Last name"
                  v-model="loginStore.currentUser.lastName"
                />
              </div>
              <div>
                <label
                  for="phoneNumber"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Phone number</label
                >
                <input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="12"
                  v-model="loginStore.currentUser.phone"
                />
              </div>
              <div>
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Date of birth</label
                >
                <Datepicker
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  v-model="formatDateOfBirth"
                  :format="'YYYY-MM-DD'"
                />
              </div>

              <div>
                <button
                  type="button"
                  @click="format"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Update information
                </button>
              </div>
            </div>
            <button
              type="submit"
              class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add product
            </button>
          </form>
        </div>
      </div>
    </section>
  </section>
</template>
<script setup lang="ts">
import { useLoginStore } from '@/stores/LoginStore'
import { server } from 'typescript'
import { computed, ref } from 'vue'
import Datepicker from 'vue3-datepicker'
import 'filepond/dist/filepond.min.css'
import vueFilePond, { setOptions } from 'vue-filepond'

// Tải FilePond plugin
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

const FilePond = vueFilePond(FilePondPluginImagePreview)

const loginStore = useLoginStore()

const formatDateOfBirth = computed({
  get: () => {
    return format()
  },

  set: (value) => {
    loginStore.currentUser.dateOfBirth = value ? value.getTime() : null
  },
})

const format = () => {
  const timestamp = loginStore.currentUser?.dateOfBirth
  const parsedTimestamp = Number(timestamp) // Chuyển đổi thành số
  if (!isNaN(parsedTimestamp)) {
    return new Date(parsedTimestamp) // Trả về giá trị kiểu Date
  } else {
    console.warn('Invalid timestamp:', timestamp)
    return null // Trả về null nếu không hợp lệ
  }
}

const isChangePassword = ref(false)
const toggleChangePassword = () => {
  isChangePassword.value = !isChangePassword.value
}

const isChangeAvatar = ref(false)
const toggleChangeAvatar = () => {
  isChangeAvatar.value = !isChangeAvatar.value
}

const avatarUrl = ref(loginStore.avatarURL)

const handleChangeAvatar = {
  process: async (fieldName: string, file: File, metadata: any, load, error, progress, abort) => {
    try {
      await loginStore.updateAvatar(loginStore.currentUser?.id, file, loginStore.token)
      load(file.name)
      avatarUrl.value = loginStore.avatarURL
    } catch (err) {
      console.error(err)
      error('Có lỗi xảy ra trong quá trình upload.')
    }
  },
}
</script>
<style scoped>
.flex-container {
  display: flex;
  width: 100%;
  height: 100vh;
  /* margin-left: 10%; */
}

.flex-item-3 {
  flex: 3;
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 5%;
}

.flex-item-2 {
  flex: 2;
  margin: 20px 20px 20px 70px;
}

.border-div-1 {
  border: 1px solid #eff3ea;
  border-radius: 10px;
}
</style>
