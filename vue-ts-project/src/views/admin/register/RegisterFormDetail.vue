<template>
  <main>
    <!-- <h1>{{ registerId }}</h1> -->
    <section class="bg-white dark:bg-gray-900">
      <div class="flex justify-between">
        <h1 class="mt-5 font-large">Register form detail</h1>
        <div class="mt-3">
          <router-link to="/admin/create-account">
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Account
            </button>
          </router-link>
        </div>
      </div>
      <div>
        <h1>Let's check your update today!!</h1>
      </div>
      <div class="border-style ml-7 mt-5">
        <div class="flex justify-between">
          <p class="font-large ml-6 my-5">Description</p>
          <button
            type="button"
            :class="{
              'format-button-status': true,
              'p-2.5 font-medium text-sm': true,
              'bg-green-200 text-green-500': registerStore.registerFormById.status,
              'bg-yellow-200 text-yellow-400': !registerStore.registerFormById.status,
            }"
          >
            {{ registerStore.registerFormById.status ? 'Submitted' : 'Pending' }}
          </button>
        </div>
        <div>
          <form class="ml-6 mb-5" @submit.prevent="registerStore.submitRegisterForm(registerId)">
            <div class="sm:col-span-2 mr-5">
              <label
                for="username"
                class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >Username: <span style="color: red">*</span></label
              >
              <input
                v-model="registerStore.registerFormById.user.username"
                type="text"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>
            <div class="flex gap-4 pr-5 mt-3">
              <div class="w-1/2">
                <label
                  for="firstname"
                  class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                  >First name: <span style="color: red">*</span></label
                >
                <input
                  type="text"
                  v-model="registerStore.registerFormById.user.firstName"
                  name="firstname"
                  id="firstname"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div class="w-1/2">
                <label
                  for="lastname"
                  class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Last name: <span style="color: red">*</span></label
                >
                <input
                  type="text"
                  v-model="registerStore.registerFormById.user.lastName"
                  name="lastname"
                  id="lastname"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
            </div>

            <div class="flex gap-4 pr-5 mt-3">
              <div class="w-1/2">
                <label
                  for="email"
                  class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Email: <span style="color: red">*</span></label
                >
                <input
                  type="email"
                  v-model="registerStore.registerFormById.user.email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div class="w-1/2">
                <label
                  for="phone"
                  class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Phone: <span style="color: red">*</span></label
                >
                <input
                  type="text"
                  v-model="registerStore.registerFormById.user.phone"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
            </div>

            <div class="sm:col-span-2 mr-5">
              <label
                for="position"
                class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
                >Position: <span style="color: red">*</span></label
              >
              <textarea
                id="position"
                v-model="registerStore.registerFormById.position"
                rows="2"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              ></textarea>
            </div>

            <div class="sm:col-span-2 mr-5">
              <label
                for="reason"
                class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
                >Reason: <span style="color: red">*</span></label
              >
              <textarea
                id="reason"
                v-model="registerStore.registerFormById.reason"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              ></textarea>
            </div>

            <button
              style="width: 130px; margin-left: 87%"
              type="submit"
              :class="{
                'format-button-status': true,
                'p-2.5 font-medium text-sm': true,
                'bg-gray-400 text-black': registerStore.registerFormById.status,
                'text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800':
                  !registerStore.registerFormById.status,
              }"
              :disabled="registerStore.registerFormById.status"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { useRegisterFormStore } from '@/stores/RegisterFormStore'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const registerId = Number(route.params.registerId)
const registerStore = useRegisterFormStore()

onMounted(async () => {
  await registerStore.loadRegisterById(registerId)
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

.format-button-status {
  margin-right: 20px;
  height: 50px;
  margin-top: 20px;
  width: 110px;
  border-radius: 29px;
}
</style>
