<template>
  <nav
    class="flex justify-between fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <img src="@/assets/logo.png" class="h-20" alt="HR*YJ Logo" />
    <div
      style="margin-right: 3%"
      v-if="loginStore.isLoggedIn"
      class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
    >
      <button
        type="button"
        class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="dropdown"
      >
        <span class="sr-only">Open user menu</span>
        <img class="w-8 h-8 rounded-full" :src="loginStore.currentUser?.avatar" alt="user photo" />
      </button>
      <!-- Dropdown menu -->
      <div
        class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        id="dropdown"
      >
        <div class="px-4 py-3">
          <span class="block text-sm text-gray-900 dark:text-white">{{
            loginStore.currentUser?.username
          }}</span>
          <span class="block text-sm text-gray-500 truncate dark:text-gray-400">{{
            loginStore.currentUser?.email
          }}</span>
        </div>
        <ul class="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
          <li>
            <RouterLink to="/user-dashboard">
              <a
                href="#"
                class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                >My courses</a
              >
            </RouterLink>
          </li>
        </ul>
        <ul class="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
          <li>
            <RouterLink to="/user-dashboard">
              <a
                href="#"
                class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                >Information</a
              >
            </RouterLink>
          </li>
        </ul>
        <ul class="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
          <li>
            <RouterLink to="/user-dashboard">
              <a
                href="#"
                class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                >Notification</a
              >
            </RouterLink>
          </li>
        </ul>
        <ul class="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
          <li>
            <a
              style="cursor: pointer"
              @click="loginStore.logout"
              class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Sign out</a
            >
          </li>
        </ul>
      </div>
      <button
        data-collapse-toggle="navbar-user"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-user"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import { useLoginStore } from '@/stores/LoginStore'

const loginStore = useLoginStore()
</script>
