<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <nav aria-label="Page navigation example">
    <ul class="flex items-center -space-x-px h-10 text-base">
      <li
        style="cursor: pointer"
        :class="{ disabled: currentPage === 1 }"
        @click="$emit('page-change', currentPage - 1)"
      >
        <a
          class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span class="sr-only">Previous</span>
          <svg
            class="w-3 h-3 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </a>
      </li>
      <li
        style="cursor: pointer"
        v-for="page in pages"
        :key="page"
        :class="{ active: page === currentPage, disable: page === '...' }"
        @click="$emit('page-change', page)"
      >
        <a
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >{{ page + 1 }}</a
        >
      </li>

      <li
        style="cursor: pointer"
        :class="{ disabled: currentPage === totalPage - 1 }"
        @click="$emit('page-change', currentPage + 1)"
      >
        <a
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span class="sr-only">Next</span>
          <svg
            class="w-3 h-3 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPage: {
    type: Number,
    required: true,
  },
})

// const emit = defineEmits(['page-change'])

// tính toán các trang hiển thị

const pages = computed(() => {
  const maxPage = 10
  const result = []

  if (props.totalPage <= maxPage) {
    for (let i = 0; i < props.totalPage; i++) {
      result.push(i)
    }
  } else {
    result.push(1) //trang đầu tiên

    if (props.currentPage > 4) {
      result.push('...')
    }

    //hiển thị các trang xung quanh trang hiện tại
    const start = Math.max(2, props.currentPage - 2)
    const end = Math.min(props.totalPage - 1, props.totalPage + 2)

    for (let i = start; i <= end; i++) {
      result.push(i)
    }

    if (props.currentPage < props.totalPage - 3) {
      result.push('...') // Thêm dấu "..."
    }

    result.push(props.totalPage)
  }
  return result
})

// const changePage = (page: number) => {
//   if (page >= 1 && page <= props.totalPage) {
//     emit('page-change', page)
//     console.log('545' + page)
//   }
// }
</script>
