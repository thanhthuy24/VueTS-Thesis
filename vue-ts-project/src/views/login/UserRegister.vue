<template>
  <main>
    <div class="flex mt-10 mx-auto">
      <div><img src="@/assets/login1.jpg" style="width: 900px" /></div>
      <div>
        <img src="@/assets/logo.png" style="width: 300px" class="mx-auto" />
        <p class="my-3">
          Start your website in seconds. You're account before?
          <router-link to="/login">
            <span class="font-bold" style="color: blue; text-decoration: underline">Sign in</span>
          </router-link>
        </p>
        <form class="max-w-md mx-auto" @submit.prevent="registerAccount">
          <div>
            <div class="flex">
              <div class="w-full mr-3">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Email</label
                >
                <input
                  v-model="email"
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type email"
                />
              </div>
              <div class="w-full">
                <label
                  for="phone"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Phone</label
                >
                <input
                  v-model="phone"
                  type="text"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type phone"
                />
              </div>
            </div>

            <div class="flex mt-5">
              <div class="w-full mr-3">
                <label
                  for="firstname"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >First name</label
                >
                <input
                  v-model="firstName"
                  type="text"
                  name="firstname"
                  id="firstname"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="First name"
                />
              </div>
              <div class="w-full">
                <label
                  for="lastname"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Last name</label
                >
                <input
                  v-model="lastName"
                  type="text"
                  name="lastname"
                  id="lastname"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div class="relative z-0 w-full mb-5 group mt-5">
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Username</label
              >
              <input
                v-model="username"
                required
                type="text"
                id="username"
                aria-describedby="helper-text-explanation"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ex: john123"
              />
            </div>
            <div class="mb-5">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                id="password"
                placeholder="••••••••"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
                v-model="confirmPassword"
                type="password"
                name="confirm-password"
                id="retypePassword"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div class="relative my-5">
            <hr class="border-gray-300" />
            <span
              class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2"
            >
              or Sign up with
            </span>
          </div>

          <div class="flex justify-center mb-10 mt-10">
            <div>
              <img src="@/assets/google_logo.svg.png" class="w-12 h-12" />
            </div>
            <div class="ml-10">
              <img src="@/assets/fb_logo.svg.png" class="w-11 h-11" />
            </div>
          </div>
          <button
            type="submit"
            style="width: 445px"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign in to your account
          </button>
        </form>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { authAPIs, endpoints } from '@/configs/APIs'
import { ref } from 'vue'
import router from '@/router'

const email = ref<string>('')
const phone = ref<string>('')
const username = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const firstName = ref<string>('')
const lastName = ref<string>('')
const facebookAccountId = 0
const roleId = 1

const registerAccount = async () => {
  try {
    const formData = new FormData()
    formData.append('email', email.value)
    formData.append('phone', phone.value)
    formData.append('username', username.value)
    formData.append('password', password.value)
    formData.append('retypePassword', confirmPassword.value)
    formData.append('firstName', firstName.value)
    formData.append('lastName', lastName.value)
    formData.append('facebookAccountId', facebookAccountId.toString())
    formData.append('googleAccountId', facebookAccountId.toString())
    formData.append('roleId', roleId.toString())
    await authAPIs().post(`${endpoints.user}/register-account`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log('Register successfully')
    router.push('/login')
  } catch (err) {
    console.error(err)
  }
}
</script>
