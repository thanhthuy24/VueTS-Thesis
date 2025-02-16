<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="flex justify-between">
      <h1 class="mt-5 font-large">Create account</h1>
    </div>
    <div>
      <h1>Let's check your update today!!</h1>
    </div>
    <div class="border-style ml-7 mt-5">
      <div>
        <p class="font-large ml-6 my-5">Description</p>
      </div>
      <div>
        <form class="ml-6 mb-5" @submit.prevent="createAccount">
          <div class="sm:col-span-2 mr-5">
            <label
              for="username"
              class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
              >Username: <span style="color: red">*</span></label
            >
            <input
              type="text"
              v-model="username"
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
                v-model="firstName"
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
                v-model="lastName"
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
                v-model="email"
                type="email"
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
                v-model="phone"
                name="phone"
                id="phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>
          </div>
          <div class="mr-5">
            <label
              for="role"
              class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
              >Role: <span style="color: red">*</span></label
            >
            <select
              id="role"
              v-model="roleId"
              selected
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option v-for="(item, id) in userStore.roles" :value="item.id" :key="id">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="flex gap-4 pr-5 mt-3">
            <div class="w-1/2">
              <label
                for="password"
                class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password: <span style="color: red">*</span></label
              >
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>
            <div class="w-1/2">
              <label
                for="retypePassword"
                class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >Confirm Password: <span style="color: red">*</span></label
              >
              <input
                type="password"
                v-model="confirmPassword"
                name="retypePassword"
                id="retypePassword"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
import { useRegisterFormStore } from '@/stores/RegisterFormStore'
import { useUserStore } from '@/stores/UserStore'
import { onMounted, ref } from 'vue'
// import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()

// const route = useRoute()
const userStore = useUserStore()
const registerStore = useRegisterFormStore()

const email = ref<string>('')
const phone = ref<string>('')
const username = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const firstName = ref<string>('')
const lastName = ref<string>('')
const facebookAccountId = 0
const googleAccountId = 0
const roleId = ref<number | null>(null)

const userId = ref<number | null>(null)

const createAccount = async () => {
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
    formData.append('googleAccountId', googleAccountId.toString())

    if (roleId.value != null && roleId.value !== undefined) {
      formData.append('roleId', roleId.value.toString())
    } else {
      console.error('roleId is invalid:', roleId.value)
    }

    const res = await authAPIs().post(`${endpoints.user}/register-account`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    userId.value = res.data.id
    console.log('userid: ' + userId.value)

    await userStore.createTeacher(
      registerStore.registerFormById.position,
      registerStore.registerFormById.reason,
      Number(userId.value),
    )

    toast.success('Create account successfully!!')
    await userStore.sendEmail(registerStore.registerFormById.user.email, res.data.username)
    toast.success('Email send successfully!!')

    firstName.value = ''
    lastName.value = ''
    username.value = ''
    password.value = ''
    email.value = ''
    phone.value = ''
    confirmPassword.value = ''
    roleId.value = null
  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  await userStore.loadRole()
  // console.log('information: ' + registerStore.registerFormById.position)
  // console.log('user form id: ' + userFormId)
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
