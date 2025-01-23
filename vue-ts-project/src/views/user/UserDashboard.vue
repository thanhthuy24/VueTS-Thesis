<template>
  <section class="flex-container container">
    <section class="flex-item-2 border-div-1">
      <div style="display: flex; justify-content: center">
        <img :src="loginStore.currentUser?.avatar" class="rounded-full w-56 h-56 mx-5 my-5" />
      </div>

      <div class="w-full flex justify-center">
        <h2 class="format-username">{{ loginStore.currentUser?.username }}</h2>
      </div>
      <hr />
      <div>
        <ul class="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
          <li>
            <a
              @click="toggleUpdateInformation"
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
                  fill-rule="evenodd"
                  d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z"
                  clip-rule="evenodd"
                />
              </svg>

              Update Information
            </a>
          </li>
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
      <div>
        <div
          v-if="isChangePassword"
          class="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0"
        >
          <div
            class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8"
          >
            <h2
              class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Change Password
            </h2>
            <form
              class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              @submit.prevent="handleChangePassword"
            >
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your old Password</label
                >
                <input
                  v-model="oldPassword"
                  type="password"
                  name="password"
                  id="oldPassword"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >New Password</label
                >
                <input
                  v-model="newPassword"
                  type="password"
                  name="password"
                  id="newPassword"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Confirm password</label
                >
                <input
                  v-model="retypePassword"
                  type="password"
                  name="confirm-password"
                  id="retypePassword"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="newsletter" class="font-light text-gray-500 dark:text-gray-300"
                    >I accept the
                    <a
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                      >Terms and Conditions</a
                    ></label
                  >
                </div>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Reset password
              </button>
            </form>
          </div>
        </div>
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
        <div v-if="isUserInfor" class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
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
import { computed, ref } from 'vue'
import Datepicker from 'vue3-datepicker'
import 'filepond/dist/filepond.min.css'
import vueFilePond from 'vue-filepond'

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
const isChangeAvatar = ref(false)
const isUserInfor = ref(true)

const toggleChangePassword = () => {
  isChangePassword.value = !isChangePassword.value
  isChangeAvatar.value = false
  isUserInfor.value = false
}

const toggleChangeAvatar = () => {
  isChangeAvatar.value = !isChangeAvatar.value
  isChangePassword.value = false
  isUserInfor.value = false
}

const toggleUpdateInformation = () => {
  isUserInfor.value = !isUserInfor.value
  isChangeAvatar.value = false
  isChangePassword.value = false
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

const oldPassword = ref<string | null>(null)
const newPassword = ref<string | null>(null)
const retypePassword = ref<string | null>(null)

const handleChangePassword = () => {
  if (oldPassword.value && newPassword.value && retypePassword.value) {
    loginStore.handleChangePass(oldPassword.value, newPassword.value, retypePassword.value)
  } else {
    console.error('oldPassword or newPassword or retypePassword is missing')
  }
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

.format-username {
  font-size: x-large;
  font-weight: bold;
  padding-bottom: 10px;
}
</style>
