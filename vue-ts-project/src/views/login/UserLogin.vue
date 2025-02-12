<template>
  <div class="flex mt-10 mx-auto justify-end">
    <div>
      <img src="@/assets/logo.png" style="width: 300px" class="mx-auto" />
      <h5 class="font-bold" style="font-size: xx-large">Wellcome back</h5>
      <p class="my-3">
        Start your website in seconds. Don’t have an account?
        <router-link to="/register-account">
          <span class="font-bold" style="color: blue; text-decoration: underline">Sign up</span>
        </router-link>
      </p>
      <form class="max-w-md mx-auto" @submit.prevent="handleLogin">
        <div>
          <div class="relative z-0 w-full mb-5 group">
            <label
              for="username"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Username</label
            >
            <input
              required
              v-model="username"
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
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div v-if="loginStore.statusWarning" class="format-error-login">
            Username or Password is not correct!!
          </div>
        </div>

        <router-link to="/">
          <p style="margin-left: 71%; color: blue; font-style: italic" class="my-5">
            Forgot password?
          </p>
        </router-link>

        <div class="relative my-5">
          <hr class="border-gray-300" />
          <span class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
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
    <div>
      <img src="@/assets/login1.jpg" style="width: 900px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/stores/LoginStore'
import { onMounted, ref } from 'vue'

const username = ref<string | null>(null)
const password = ref<string | null>(null)

const loginStore = useLoginStore()

// const isLogged = ref(false)
const handleLogin = () => {
  if (username.value && password.value) {
    loginStore.loginAcc(username.value, password.value)
  } else {
    console.log('Username or password is missing')
  }
}

onMounted(async () => {
  // await loginStore.loadLogin()
})
</script>
<style scoped>
.format-error-login {
  font-size: small;
  color: red;
  font-style: italic;
}
</style>
