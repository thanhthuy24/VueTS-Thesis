<template>
  <main class="mt-10">
    <div class="flex justify-center">
      <img style="width: 1200px; height: 600px" src="@/assets/form.png" alt="55555" />
    </div>
    <div class="flex justify-center">
      <div
        style="border: 1px solid grey; border-radius: 10px; width: 1200px; height: 780px"
        class="mt-10"
      >
        <div>
          <h1 class="mt-10" style="font-size: x-large; font-weight: bold; margin-left: 30%">
            FILL THIS FORM TO JOIN WITH US NOW!!
          </h1>
        </div>
        <div>
          <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
              <form @submit.prevent="handleSubmitRegister(positionText, reasonText)">
                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div class="sm:col-span-2">
                    <label
                      for="username"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Username</label
                    >
                    <input
                      type="text"
                      name="username"
                      id="username"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type Username"
                      required
                    />
                  </div>
                  <div class="w-full">
                    <label
                      for="firstName"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >First Name</label
                    >
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type your first name"
                      required
                    />
                  </div>
                  <div class="w-full">
                    <label
                      for="lastName"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Last Name</label
                    >
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type your last name"
                      required
                    />
                  </div>
                  <div class="sm:col-span-2">
                    <label
                      for="position"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Position</label
                    >
                    <input
                      v-model="positionText"
                      type="text"
                      name="position"
                      id="position"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type your position you apply"
                      required
                    />
                  </div>
                  <div class="sm:col-span-2">
                    <label
                      for="reason"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >The reason why you apply for being Teacher:</label
                    >
                    <textarea
                      v-model="reasonText"
                      id="reason"
                      rows="8"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Reason"
                      required
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  style="margin-left: 89%"
                  class="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Send
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="mt-10"></div>
  </main>
</template>
<script lang="ts" setup>
import { useRegisterFormStore } from '@/stores/RegisterFormStore'
import { onMounted, ref } from 'vue'

const registerStore = useRegisterFormStore()

const username = ref('')

const firstName = ref('')

const lastName = ref('')
const positionText = ref('')
const reasonText = ref('')

const handleSubmitRegister = async (position: string, reason: string) => {
  try {
    username.value = ''
    firstName.value = ''
    lastName.value = ''
    positionText.value = ''
    reasonText.value = ''
    await registerStore.registerForm(position, reason)
  } catch (error) {
    console.error('Đăng ký không thành công:', error)
  }
}

onMounted(async () => {})
</script>
